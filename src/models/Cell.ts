export class Cell{
  /**
   * flags for all the sides/edges of the cell to identify if it is a wall or not and default is true 
   */ 
  northEdge: boolean = true;
  eastEdge: boolean = true;
  southEdge: boolean = true;
  westEdge: boolean = true;

  /**
   * a flag to identify if the cell is visited or not, used in the maze generation and default is false
   */
  visited: boolean = false;

  neighbors: Cell[] = [];
  /**
   *
   */
  constructor(public row: number = 0, public col:number = 0){

  }



}