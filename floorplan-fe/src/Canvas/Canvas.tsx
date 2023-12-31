import "./Canvas.css";
import { useEffect, useRef, useState } from "react";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;

    // Drawing code
    if (!context) return;
    // Drawing styles
    context.lineWidth = 2;
    context.lineCap = "round";
    context.strokeStyle = "black";
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const { offsetX, offsetY } = event.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const { offsetX, offsetY } = event.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const rotateClockwise = () => {
    setRotation(rotation + 90);
  };

  const rotateCounterClockwise = () => {
    setRotation(rotation - 90);
  };

  return (
    <div className="container">
      <canvas
        style={{ transform: `rotate(${rotation}deg)` }}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
      <button onClick={clearCanvas}>Clear</button>
      <div className="rotation">
        <button onClick={rotateClockwise}>Rotate Clockwise</button>
        <button onClick={rotateCounterClockwise}>Rotate Counerclockwise</button>
      </div>
    </div>
  );
};
