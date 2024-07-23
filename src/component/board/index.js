import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from "@/slice/menuSlice";
import { socket } from "@/socket.js";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Board = () => {

  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const isDraw = useRef(false);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);

  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  console.log(actionMenuItem, activeMenuItem);
  const { color, brushSize } = useSelector(
    (state) => state.toolbox[activeMenuItem]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO)
        historyPointer.current -= 1;
      if (
        historyPointer.current < drawHistory.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      )
        historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      ctx.putImageData(imageData, 0, 0);
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const changeConfig = (color, brushSize) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    };
    changeConfig(color, brushSize);
    socket.emit("changeConfig", { color, brushSize });

    socket.on("changeConfig", (arg) => {
      const { color, brushSize } = arg;
      console.log( color, brushSize );
      changeConfig(color, brushSize);
    });
  }, [color, brushSize]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function beginPath(x, y) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    function drawPath(x, y) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    function mousePress(e) {
      isDraw.current = true;
      beginPath(e.clientX, e.clientY);
      socket.emit("beginPath", { x: e.clientX, y: e.clientY });
    }

    function mousemove(e) {
      if (!isDraw.current) return;
      drawPath(e.clientX, e.clientY);
      socket.emit("drawPath", { x: e.clientX, y: e.clientY });
    }
    function mouseRelease() {
      isDraw.current = false;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    }
    canvas.addEventListener("mousedown", mousePress);
    canvas.addEventListener("mousemove", mousemove);
    canvas.addEventListener("mouseup", mouseRelease);

    // client-side
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("hello", (arg) => {
      console.log(arg); // world
    });
    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });
    socket.on("beginPath", (arg) => {
      const { x, y } = arg;

      beginPath(x, y);
    });
    socket.on("drawPath", (arg) => {
      const { x, y } = arg;
      drawPath(x, y);
    });
    // socket.on("changeConfig", (arg) => {
    //   const { color, brushSize } = arg;
    //   console.log( color, brushSize );
    //   // changeConfig(color, brushSize);
    // });

    
    return () => {
      canvas.removeEventListener("mousedown", mousePress);
      canvas.removeEventListener("mousemove", mousemove);
      canvas.removeEventListener("mouseup", mouseRelease);

      socket.off("beginPath", (arg) => {
        const { x, y } = arg;
        beginPath(x, y);
      });

      socket.off("drawPath", (arg) => {
        const { x, y } = arg;
        drawPath(x, y);
      });
    };
  }, []);

  return <canvas ref={canvasRef} />;
};
