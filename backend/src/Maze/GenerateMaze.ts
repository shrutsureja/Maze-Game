import { HuntAndKill } from "./Algorithms/HuntAndKill";
import { Cell } from "./Cell";
import { Utils, Path } from "./Utils";

class GenerateMaze {
  private cells: Cell[][] = [];
  private mazeSolution: Cell[] = [];
  private rows:number;
  private columns : number;
  constructor( rows: number, columns: number ) {
    this.rows = rows;
    this.columns = columns;
    
    // initialize the 2d maze grid
    for(let i = 0; i < rows ; i++){
      this.cells[i] = [];
      for(let j = 0; j < columns; j++){
        this.cells[i][j] = new Cell(i,j);
      }
    }

    //map the neighbours 
    this.cells.forEach(row => {
      row.forEach(col => this.mapNeighbors(col))
    });
  }

  private convertMazeToJSON(maze : Cell[][]){
    const response = maze.map(row => {
      return row.map(cell => {
        return {
          row : cell.row,
          col : cell.col,
          northEdge : cell.northEdge,
          eastEdge : cell.eastEdge,
          southEdge : cell.southEdge,
          westEdge : cell.westEdge,
        }
      })
    })
    return response;
  }

  private convertPathToJSON(path : Cell[]){
    return path;
  } 

  generateNewMaze(algorithmName : string, animation: boolean) : Cell[][]{
    let maze : Cell[][] = [];
    let animationPath : Path[] = [];
    if(algorithmName === 'huntandkill'){
      const huntAndKillObj = new HuntAndKill(this.rows, this.columns, animation, this.cells);
      maze = huntAndKillObj.getGeneratedMaze();
      if(animation){
        animationPath = huntAndKillObj.getAnimationPath();
      }
    }
    else if(algorithmName === 'recursivebacktracking'){
      // alog
    }

    
    // at this return it only need to return the data like this 
    /**
     * {
     *  cells : [ [{x}, {x}, {x}, {x}, {x} ... columns - 1],
     *            [{x}, {x}, {x}, {x}, {x} ... columns - 1],
     *            .
     *            .
     *            .
     *            rows - 1
     *          ]
     * }
     * 
     * each x consists of 
     * {
     *  row: number;
     *  col: number;
     *  northEdge : false;
     *  eastEdge : false;
     *  southEdge : false;
     *  westEdge : false;
     * }
     */
    const jsonMaze = this.convertMazeToJSON(maze);
    // combine all in one Maze, Animation, Solution
    const response : any = {
      maze : jsonMaze,
      animation : animation ? animationPath : false
    }
    return response;
  }

  getSolutionPath(){
    return this.mazeSolution;
  }

  private mapNeighbors(cell : Cell):void{
    if(cell.row - 1 >= 0){
      cell.neighbors.push(this.cells[cell.row - 1][cell.col]);
    }
    if(cell.row + 1 < this.rows){
      cell.neighbors.push(this.cells[cell.row + 1][cell.col]);
    }
    if(cell.col - 1 >= 0){
      cell.neighbors.push(this.cells[cell.row][cell.col - 1]);
    }
    if(cell.col + 1 < this.columns){
      cell.neighbors.push(this.cells[cell.row][cell.col + 1]);
    }
    cell.neighbors = Utils.shuffleArray<Cell>(cell.neighbors);
  }
}

export { GenerateMaze };