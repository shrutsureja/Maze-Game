import { Cell } from "../Cell"

export class HuntAndKill{
  public readonly cells: Cell[][] = [];
  public readonly algorithmName: string = "Hunt and Kill";

  constructor(public nRows: number, public nCols: number){
    // we have initialized the 2d grid
    for(let i = 0; i < nRows; i++){
      this.cells[i] = [];
      for(let j = 0; j < nCols; j++){
        this.cells[i][j] = new Cell(i,j);
      }
    }

    // now we will map the neighbours
    this.cells.forEach(row => row.forEach(col => this.mapNeighbours(col)));

    
  }

  private mapNeighbours(cell : Cell){
    if(cell.row - 1 >= 0){
      cell.neighbors.push(this.cells[cell.row - 1][cell.col]);
    }
    if(cell.row + 1 < this.nRows){
      cell.neighbors.push(this.cells[cell.row + 1][cell.col]);
    }
    if(cell.col - 1 >= 0){
      cell.neighbors.push(this.cells[cell.row][cell.col - 1]);
    }
    if(cell.col + 1 < this.nCols){
      cell.neighbors.push(this.cells[cell.row][cell.col + 1]);
    }
    cell.neighbors=  Utils.shuffleArray<Cell>(cell.neighbors)
  }
}


class Utils{
  //for shuffling the array
  static shuffleArray<T>(arr: T[]): T[] {
    let n = arr.length;
    while (n) {
      const i = Math.floor(Math.random() * n--);
      [arr[n], arr[i]] = [arr[i], arr[n]];
    }
    return arr;
  }
}