import { useEffect, useRef } from "react";

const MazeBoard = (props : any) => {
  // inputs states 
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  
  const { mazeData } = props;

  console.log(mazeData);
  

  // useEffect(()=>{
  //   if(canvasRef.current === null){
  //     throw new Error("Canvas Element Not Found");
  //   }

  //   canvasRef.current.width = 500;
  //   canvasRef.current.height = 500;
  //   ctx.current = canvasRef.current.getContext("2d");

  //   if (ctx.current) {
  //     ctx.current.fillStyle = "red";
  //     ctx.current.fillRect(50, 50, 100, 100);
  //   }
  //   return () => {
  //     canvasRef.current = null;
  //     ctx.current = null;
  //   }
  // } , []);
  
  // event listeners here 

  return <>
    <div>
      <canvas ref={canvasRef}></canvas>
      Shrut Sureja
    </div>
  </>
}

export default MazeBoard;