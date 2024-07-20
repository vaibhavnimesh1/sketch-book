import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const Board = () => {
  const canvasRef = useRef(null);
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const {color,brushSize} = useSelector((state) => state.toolbox[activeMenuItem]);
console.log(color,brushSize);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.width;
    canvas.height = window.height;
  }, []);

  return <canvas ref={canvasRef} />;
};
