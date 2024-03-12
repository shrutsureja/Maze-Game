import { Cell } from "./Cell";

export class MazeGameEngine {
  private cells: Cell[][]; 
  private context: CanvasRenderingContext2D;
  private setStatus : React.Dispatch<React.SetStateAction<'home' | 'animating' | 'playing' | 'paused' | 'finished'>>;
  private nRows : number;
  private nColumns : number;
  private myPath : Cell[] = [];
  private currentCell : Cell = new Cell(0 , 0, true, true, true, true); // Assign a default value to 'currentCell'
  // Current ctx design
  private cellSize : number = 20;
  private cellEdgeThickness : number = 2;
  private myPathColor = '#4080FF';
  private cellBackground = '#ccc'
  private myPathThickness = 10;

  constructor(cellsData:Cell[][], context : CanvasRenderingContext2D, setStatus : React.Dispatch<React.SetStateAction<'home' | 'animating' | 'playing' | 'paused' | 'finished'>>) {
    if(cellsData){
        this.cells = cellsData.map(row => row.map(cellData => new Cell(cellData.row, cellData.col, cellData.northEdge, cellData.southEdge, cellData.eastEdge, cellData.westEdge)));
        this.context = context;
        this.setStatus = setStatus;
      if(this.cells){
        this.nRows = this.cells.length;
        this.nColumns = this.cells[0].length;
      }
      else {
        this.nRows = 0;
        this.nColumns = 0;
      }
    }
    else {
      this.nRows = 0;
      this.nColumns = 0;
      this.cells = [];
      this.context = {} as CanvasRenderingContext2D;
      this.setStatus = setStatus;
    }
  }

  public renderBoard(){
    if(this.cells){
      this.generateBoard();
    }
    else {
      console.log("There are NO Cells here");
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
          this.context.fillStyle = this.cellBackground;
        }
        if (this.context) {
          this.context.fillRect(c.col * this.cellSize, c.row * this.cellSize, this.cellSize, this.cellSize);
        }
      }));
      // opening the FirstCell
      this.cells[0][0].westEdge = false;
      // opening the last cell
      this.cells[this.nRows - 1][this.nColumns - 1].eastEdge = false;
      // rendering borders 
      this.cells.forEach(x => x.forEach(cell => 
        {
          this.renderBoaders(cell);
        }
      ));
    }

    this.initPlay();
  }

  private initPlay() {
    this.myPath.length = 0;
    this.currentCell = this.cells[0][0];
    this.myPath.push(this.currentCell);

    // drawing
    this.context.lineWidth = this.myPathThickness;
    this.context.strokeStyle = this.myPathColor;
    this.context.beginPath();
    this.context.moveTo(0, this.cellSize / 2);
    this.context.lineTo(this.cellSize / 2, this.cellSize / 2);
    this.context.stroke();
  }

  // returns true if the game is over
  private isGameOver(cell : Cell){
    if(cell.row === this.nRows - 1 && cell.col === this.nColumns - 1){
      return true;
    }
    else {
      return false
    }
  }

  // Event handler or the path tracker
  public moveCurrentPosition(movement : string){
    let nextCell: Cell | undefined;
    
    if(this.isGameOver(this.currentCell)){
      return;
    }
    // restrict the movement if outside the grid otherwise find the nextCell
    if(movement === 'up'){
      if(this.currentCell.row < 1) return;
      nextCell = this.cells[this.currentCell.row - 1][this.currentCell.col];
    }
    if(movement === 'down'){
      if(this.currentCell.row + 1 >= this.nRows) return;
      nextCell = this.cells[this.currentCell.row + 1][this.currentCell.col];  
    }
    if (movement === 'left') {
      if (this.currentCell.col < 1) return;
      nextCell = this.cells[this.currentCell.row][this.currentCell.col - 1];
    }
    if (movement === 'right') {
      if (this.currentCell.col + 1 >= this.nColumns) return;
      nextCell = this.cells[this.currentCell.row][this.currentCell.col + 1];
    }

    // now we will verify for the borders of the cell
    // for that we need to check that is this nextCell connected to the currentCell
    // if yes then move else return
    if (nextCell && nextCell.isConnectedTo(this.currentCell)){
      // need to check the stepback first 
      if(this.myPath.length > 1 && this.myPath[(this.myPath.length - 1) - 1].equals(nextCell)){
        this.drawPath(this.myPath, this.cellBackground);
        this.myPath.pop();
      }
      else {
        this.myPath.push(nextCell); 
          if(nextCell.equals(this.cells[this.nRows - 1][this.nColumns - 1])){
            //last cell 
            this.setStatus('finished');
            this.drawPath(this.myPath);
            alert("finished");
          }
      }
      this.drawPath(this.myPath);
      this.currentCell = nextCell;
    }

  }

  private drawPath(path : Cell[], color = this.myPathColor, lineThickness = this.myPathThickness){
    this.context.lineWidth = lineThickness;
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.moveTo(0, this.cellSize / 2);

    path.forEach(x =>
      this.context.lineTo(
        (x.col + 0.5) * this.cellSize,
        (x.row + 0.5) * this.cellSize
      )
    );
    this.context.stroke();
  }
}