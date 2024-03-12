
export class Cell {

  northEdge : boolean = true;
  eastEdge : boolean = true;
  southEdge : boolean = true;
  westEdge : boolean = true;
  row : number = 0;
  col : number = 0;
  

  constructor(row : number, col : number, northEdge : boolean, southEdge : boolean, eastEdge : boolean, westEdge : boolean){
    this.row = row;
    this.col = col;
    this.northEdge = northEdge;
    this.southEdge = southEdge;
    this.eastEdge = eastEdge;
    this.westEdge = westEdge;
  }

  public isConnectedTo(nextCell : Cell) : boolean{
    if(this.row === nextCell.row){
      if(this.col - 1 === nextCell.col){
        if(this.westEdge === false && nextCell.eastEdge === false){
          return true;
        }
      }
      if(this.col + 1 === nextCell.col){
        if(this.eastEdge === false && nextCell.westEdge === false){
          return true;
        }
      }
    }
    if(this.col === nextCell.col){
      if(this.row - 1 === nextCell.row){
        if(this.northEdge === false && nextCell.southEdge === false){
          return true;
        }
      }
      if(this.row + 1 === nextCell.row){
        if(this.southEdge === false && nextCell.northEdge === false){
          return true;
        }
      }
    }
    return false;
  }

  public equals(anotherCell : Cell) : boolean{
    if(this.row === anotherCell.row && this.col === anotherCell.col){
      return true;
    }
    return false;
  }
}