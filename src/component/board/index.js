import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const Board = () => {
  const canvasRef = useRef(null);
  const isDraw = useRef(false);
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color, brushSize } = useSelector(
    (state) => state.toolbox[activeMenuItem]
  );
  console.log(color, brushSize);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const changeConfig = () => {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    };
    changeConfig();
    function beginPath(x, y) {
      ctx.beginPath();
      ctx.moveTo(x,y);
}
    function DrawPath(x, y) {
      ctx.lineTo(x,y);
      ctx.stroke();
}

    function mousePress(e) {
      isDraw.current = true;
        beginPath(e.clientX, e.clientY)
    }

    function mousemove(e) {
      if (!isDraw.current) return;
      DrawPath(e.clientX, e.clientY)
    }
    function mouseRelease() {
      isDraw.current = false;
    }
    canvas.addEventListener("mousedown", mousePress);
    canvas.addEventListener("mousemove", mousemove);
    canvas.addEventListener("mouseup", mouseRelease);

    return () => {
    canvas.removeEventListener("mousedown", mousePress);
    canvas.removeEventListener("mousemove", mousemove);
    canvas.removeEventListener("mouseup", mouseRelease);
    }
  }, [color, brushSize]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  return <canvas ref={canvasRef} />;
};
