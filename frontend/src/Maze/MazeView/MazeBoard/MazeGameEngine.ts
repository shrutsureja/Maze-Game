

export class MazeGameEngine {
  private cells: Cell[][]; 
  private context: CanvasRenderingContext2D;
  private setStatus : React.SetStateAction<'home' | 'animating' | 'playing' | 'paused' | 'finished'>;
  private nRows : number;
  private nColumns : number;
  private myPath : Cell[] = [];
  // Current ctx design
  private cellSize : number = 20;
  private cellEdgeThickness : number = 2;
  private myPathColor = '#4080FF';
  private myPathThickness = 10;

  constructor(cells:Cell[][], context : CanvasRenderingContext2D, setStatus : React.SetStateAction<'home' | 'animating' | 'playing' | 'paused' | 'finished'>) {
    this.cells = cells;
    console.log(this.cells);
    
    this.context = context;
    this.setStatus = setStatus;
    if(cells){
      this.nRows = cells.length;
      this.nColumns = cells[0].length;
    }
    else {
      this.nRows = 0;
      this.nColumns = 0;
    }
  }

  public renderBoard(){
    if(this.cells){
      this.generateBoard();
    }
    else {
      console.log("There are now Cells here");
    }
  }

  private renderBoaders(cell : Cell){
    if (this.context) {
      this.context.strokeStyle = '#000';
    }
    if (this.context) {
      this.context.lineWidth = this.cellEdgeThickness;
    }
    if (this.context) {
      if (cell.northEdge) {
        if(cell.row === 0) this.context.lineWidth = 4;
        this.context.beginPath();
        this.context.moveTo(cell.col * this.cellSize, cell.row * this.cellSize);
        this.context.lineTo((cell.col + 1) * this.cellSize, cell.row * this.cellSize);
        this.context.stroke();
        this.context.lineWidth = this.cellEdgeThickness;
      }
      if (cell.eastEdge) {
        if(cell.col === this.nColumns - 1) this.context.lineWidth = 4;
        this.context.beginPath();
        this.context.moveTo((cell.col + 1) * this.cellSize, cell.row * this.cellSize);
        this.context.lineTo(
          (cell.col + 1) * this.cellSize,
          (cell.row + 1) * this.cellSize
          );
          this.context.stroke();
        this.context.lineWidth = this.cellEdgeThickness;
      }
      if (cell.southEdge) {
        if(cell.row === this.nRows - 1) this.context.lineWidth = 4;
        this.context.beginPath();
        this.context.moveTo(
          (cell.col + 1) * this.cellSize,
          (cell.row + 1) * this.cellSize
        );
        this.context.lineTo(cell.col * this.cellSize, (cell.row + 1) * this.cellSize);
        this.context.stroke();
        this.context.lineWidth = this.cellEdgeThickness;
      }
      if (cell.westEdge) {
        if(cell.col === 0) this.context.lineWidth = 4;
        this.context.beginPath();
        this.context.moveTo(cell.col * this.cellSize, (cell.row + 1) * this.cellSize);
        this.context.lineTo(cell.col * this.cellSize, cell.row * this.cellSize);
        this.context.stroke();
        this.context.lineWidth = this.cellEdgeThickness;
      }
    } 
  }

  private generateBoard(){
    if (this.context) {
      this.context.clearRect(0, 0, this.nRows * this.cellSize, this.nColumns * this.cellSize);
      this.cells.forEach(x => x.forEach(c => {
        if (this.context) {
          this.context.fillStyle = '#ccc';
        }
        if (this.context) {
          this.context.fillRect(c.col * this.cellSize, c.row * this.cellSize, this.cellSize, this.cellSize);
        }
      }));
      // opening the FirstCell
      this.cells[0][0].northEdge = false;
      // opening the last cell
      this.cells[this.nRows - 1][this.nColumns - 1].eastEdge = false;
      // rendering borders 
      this.cells.forEach(x => x.forEach(cell => 
        {
          this.renderBoaders(cell);
        }
      ));
    }
  }

  // Event handler or the path tracker
  
}