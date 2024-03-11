import { useEffect, useRef } from "react";
import { MazeGameEngine } from './MazeGameEngine'

export default function MazeBoard (props : any) {
  
  const { mazeData, setStatus, status} = props;
  console.log(mazeData);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const maze = useRef<MazeGameEngine | null>(null);

  useEffect(()=>{
    if(canvasRef.current === null){
      console.log("canvasRef is not used.");
      return;
    }

    if(mazeData){
      canvasRef.current.height = mazeData.length * 20;
      canvasRef.current.width = mazeData[0].length * 20;
    }
    context.current = canvasRef.current.getContext('2d');
    
    if(context.current){
      const ctx = context.current;
      
      maze.current = new MazeGameEngine(
        mazeData,
        ctx,
        setStatus
      );

      window.onkeydown = (e) => {
        switch (e.key) {
          case "w":
          case "ArrowUp":
            // only execute if the status is Playing
            console.log("ArrowUp");
             
            break;
          case "s":
          case "ArrowDown":
            // only execute if the status is Playing
            console.log("ArrowDown"); 
            break;
          case "d":
          case "ArrowRight":
            console.log("ArrowRight");
            // only execute if the status is Playing
            break;
          case "a":
          case "ArrowLeft":
            console.log("ArrowLeft");
            // only execute if the status is Playing
            break;
          case "Escape":
            // only execute if the status is Playing
            console.log("Escape");
            
            break;
          default:
            break;
        }
      };
    }
    
    maze.current?.renderBoard();
    
  }, [mazeData]);

  return <>
    <div>
      <canvas ref={canvasRef} width={500} height={500}></canvas>
    </div>
  </>
}