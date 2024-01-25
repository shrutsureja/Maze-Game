import { useEffect, useRef } from "react";
import { Cell } from "../models/Cell";
import { HuntAndKill } from "../models/algorithms/HuntAndKill";

function NewMaze(){
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>(null);
  const cellSize: number = 20; // length of cell edge
  const cellEdgeThickness: number = 2; // thickness of cell edge
  // const cellBackground : string= '#FFFFFF';
  // const solutionPathColor : String= '#FF7575';
  // const myPathColor : String= '#4080FF';
  // const myPathThickness : Number= 10;
  // const solutionPathThickness : Number = 3;
  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext('2d');
    }
    console.log(canvasRef);
    
    console.log("Here in the useEffect");
    
  });

  // method to draw each cell 
  function draw(cell: Cell): void {
    if (ctxRef.current) {
      ctxRef.current.fillRect(cell.col*cellSize,cell.row*cellSize, (cell.col + 1)*cellSize, (cell.row + 1)*cellSize);
      if (cell.northEdge) {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(cell.col * cellSize, cell.row * cellSize);
        ctxRef.current.lineTo((cell.col + 1) * cellSize, cell.row * cellSize);
        ctxRef.current.stroke();
      }
      if (cell.eastEdge) {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo((cell.col + 1) * cellSize, cell.row * cellSize);
        ctxRef.current.lineTo(
          (cell.col + 1) * cellSize,
          (cell.row + 1) * cellSize
        );
        ctxRef.current.stroke();
      }
      if (cell.southEdge) {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
          (cell.col + 1) * cellSize,
          (cell.row + 1) * cellSize
        );
        ctxRef.current.lineTo(cell.col * cellSize, (cell.row + 1) * cellSize);
        ctxRef.current.stroke();
      }
      if (cell.westEdge) {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(cell.col * cellSize, (cell.row + 1) * cellSize);
        ctxRef.current.lineTo(cell.col * cellSize, cell.row * cellSize);
        ctxRef.current.stroke();
      }
    }

  }
  
  function handleClick() {
    console.log("Maze handle click ");
    const maze : HuntAndKill = new HuntAndKill(5,5);
    console.log("maze has been generated");
    
    if (canvasRef.current) {
      canvasRef.current.width = 5 * cellSize;
    }
    if (canvasRef.current) {
      canvasRef.current.height = 5 * cellSize;
    }
    if (ctxRef.current) {
      ctxRef.current.lineWidth = cellEdgeThickness;
    }
    maze.cells.forEach(x => x.forEach(c =>{ draw(c); console.log(c);
    }));
    console.log("Maze should have been generated ");
    
  }

  // function handleClick2(){
  //   console.log("handleClick2 hhas been called");
    
  // }

  return(
    <>
      <button onClick={handleClick}>Generate new Maze</button>
      <canvas ref={canvasRef} id="Maze"/>
    </>
  )
}

export default NewMaze;