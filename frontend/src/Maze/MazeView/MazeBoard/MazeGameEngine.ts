import { mazeGridFromServer, path } from '../../../components/types';
import { Cell } from './Cell';

export class MazeGameEngine {
	private cells: Cell[][]; // holds all the cells of the maze
	private context: CanvasRenderingContext2D; // has reference to the context of the page
	private setStatus: React.Dispatch<
		React.SetStateAction<
			'home' | 'animating' | 'animationPaused' | 'playing' | 'gamePaused' | 'finished'
		>
	>; // for handling the status of the maze its a State Variable
	private nRows: number; // total number of rows
	private nColumns: number; // total number of rows
	private myPath: Cell[] = []; // holds the path in which the use travels
	private animationPath: path[] = []; // holds the animationPath from the server used will animationStatus is true
	private currentAnimationCellIndex: number = 0; // Used keep track of where the animation has reached
	private currentCell: Cell = new Cell(0, 0, true, true, true, true); // Assign a default value to 'currentCell' and it holds the value of where user has reached

	// for Current context design
	private cellSize: number = 20;
	private cellEdgeThickness: number = 2;
	private myPathColor = '#4080FF';
	private animationCellBackground = '#7A7A7A';
	private cellBackground = '#ccc';
	private myPathThickness = 10;

	constructor(
		cellsData: mazeGridFromServer[][],
		context: CanvasRenderingContext2D,
		setStatus: React.Dispatch<
			React.SetStateAction<
				'home' | 'animating' | 'animationPaused' | 'playing' | 'gamePaused' | 'finished'
			>
		>,
		animationPath: path[] = []
	) {
		// If cellsData is empty then skip the assiging of values
		if (cellsData) {
			this.cells = cellsData.map((row) =>
				row.map(
					(cellData) =>
						new Cell(
							cellData.row,
							cellData.col,
							cellData.northEdge,
							cellData.southEdge,
							cellData.eastEdge,
							cellData.westEdge
						)
				)
			);
			this.context = context;
			this.setStatus = setStatus;
			if (this.cells) {
				this.nRows = this.cells.length;
				this.nColumns = this.cells[0].length;
			} else {
				this.nRows = 0;
				this.nColumns = 0;
			}
			if (animationPath.length > 0) {
				this.animationPath = animationPath;
			}
		} else {
			this.nRows = 0;
			this.nColumns = 0;
			this.cells = [];
			this.context = {} as CanvasRenderingContext2D;
			this.setStatus = setStatus;
			this.animationPath = [];
		}
	}

	// Used for initializing the animation board
	public animatingBoard() {
		// Rendering the normal board
		if (this.context) {
			this.context.clearRect(0, 0, this.nColumns * this.cellSize, this.nRows * this.cellSize);
			this.context.fillStyle = this.animationCellBackground;
			this.context.fillRect(0, 0, this.nColumns * this.cellSize, this.nRows * this.cellSize);

			// dummy cell for rendering all the borders initally
			let dummyCell = new Cell(0, 0, true, true, true, true);
			this.cells.forEach((x) =>
				x.forEach((c) => {
					dummyCell.setRowColumn(c.row, c.col);
					this.renderBoaders(dummyCell);
				})
			);
		}
	}

	// This function is used for going to the next cells in the animationsPath
	public animatingNextStep() {
		// Stoping condition when it reached at the end of animationPath
		if (this.currentAnimationCellIndex >= this.animationPath.length) {
			alert('Starting the game');
			this.setStatus('playing');
			return;
		}
		// this is used for clearing the previous blue color from the cell
		const prev =
			this.animationPath[
				this.currentAnimationCellIndex > 1 ? this.currentAnimationCellIndex - 1 : 0
			];
		// curr is for making the currentCell in the animation blue
		const curr = this.animationPath[this.currentAnimationCellIndex];

		// clears the box then clearRect(x, y, width, row)
		this.context.clearRect(
			curr.col * this.cellSize,
			curr.row * this.cellSize,
			this.cellSize,
			this.cellSize
		);

		// adding the colour at a previous location then rendering boaders of that cell
		this.context.fillStyle = this.cellBackground;
		this.context.fillRect(
			prev.col * this.cellSize,
			prev.row * this.cellSize,
			this.cellSize,
			this.cellSize
		);
		this.renderBoaders(this.cells[prev.row][prev.col]);

		// adding the color to current animation cell and rendering boaders
		this.context.fillStyle = this.myPathColor;
		this.context.fillRect(
			curr.col * this.cellSize,
			curr.row * this.cellSize,
			this.cellSize,
			this.cellSize
		);
		this.renderBoaders(this.cells[curr.row][curr.col]);

		// moving to the next cell in the animation path
		this.currentAnimationCellIndex = this.currentAnimationCellIndex + 1;
	}

	// this function is used to generate the board while user comes from status->'animating' or status->'paused'
	public renderBoard() {
		if (this.cells && this.myPath.length === 0) {
			// used when no animation is required
			this.generateBoard();
			this.initPlay();
		} else if (this.cells) {
			// this condition because in mazeBoard thire is a useEffect which renders board when status is 'playing' and when it comes
			// from status->'paused' the path got disappeared so this is to prevent that
			this.generateBoard();
			this.drawPath(this.myPath);
		} else {
			console.log('There are NO Cells here');
		}
	}

	// used for rendering the borders of a cell left, right, top and bottom
	private renderBoaders(cell: Cell) {
		if (this.context) {
			this.context.strokeStyle = '#000';
		}
		if (this.context) {
			this.context.lineWidth = this.cellEdgeThickness;
		}
		if (this.context) {
			if (cell.northEdge) {
				if (cell.row === 0) this.context.lineWidth = 4;
				this.context.beginPath();
				this.context.moveTo(cell.col * this.cellSize, cell.row * this.cellSize);
				this.context.lineTo((cell.col + 1) * this.cellSize, cell.row * this.cellSize);
				this.context.stroke();
				this.context.lineWidth = this.cellEdgeThickness;
			}
			if (cell.eastEdge) {
				if (cell.col === this.nColumns - 1) this.context.lineWidth = 4;
				this.context.beginPath();
				this.context.moveTo((cell.col + 1) * this.cellSize, cell.row * this.cellSize);
				this.context.lineTo((cell.col + 1) * this.cellSize, (cell.row + 1) * this.cellSize);
				this.context.stroke();
				this.context.lineWidth = this.cellEdgeThickness;
			}
			if (cell.southEdge) {
				if (cell.row === this.nRows - 1) this.context.lineWidth = 4;
				this.context.beginPath();
				this.context.moveTo((cell.col + 1) * this.cellSize, (cell.row + 1) * this.cellSize);
				this.context.lineTo(cell.col * this.cellSize, (cell.row + 1) * this.cellSize);
				this.context.stroke();
				this.context.lineWidth = this.cellEdgeThickness;
			}
			if (cell.westEdge) {
				if (cell.col === 0) this.context.lineWidth = 4;
				this.context.beginPath();
				this.context.moveTo(cell.col * this.cellSize, (cell.row + 1) * this.cellSize);
				this.context.lineTo(cell.col * this.cellSize, cell.row * this.cellSize);
				this.context.stroke();
				this.context.lineWidth = this.cellEdgeThickness;
			}
		}
	}

	private generateBoard() {
		if (this.context) {
			// setting the background
			this.context.clearRect(0, 0, this.nColumns * this.cellSize, this.nRows * this.cellSize);
			this.context.fillStyle = this.cellBackground;
			this.context.fillRect(0, 0, this.nColumns * this.cellSize, this.nRows * this.cellSize);

			this.cells[0][0].westEdge = false; // opening the FirstCell
			this.cells[this.nRows - 1][this.nColumns - 1].eastEdge = false; // opening the last cell
			// rendering borders of each cell
			this.cells.forEach((x) =>
				x.forEach((cell) => {
					this.renderBoaders(cell);
				})
			);
		}
	}

	// initializing the starting point and path
	private initPlay() {
		this.myPath.length = 0;
		this.currentCell = this.cells[0][0];
		this.myPath.push(this.currentCell);

		// drawing the stating small blue mark
		this.context.lineWidth = this.myPathThickness;
		this.context.strokeStyle = this.myPathColor;
		this.context.beginPath();
		this.context.moveTo(0, this.cellSize / 2);
		this.context.lineTo(this.cellSize / 2, this.cellSize / 2);
		this.context.stroke();
	}

	// returns true if the game is over
	private isGameOver(cell: Cell) {
		if (cell.row === this.nRows - 1 && cell.col === this.nColumns - 1) {
			this.setStatus('finished');
			return true;
		} else {
			return false;
		}
	}

	// Event handler function which moves the current player
	public moveCurrentPosition(movement: string) {
		let nextCell: Cell | undefined;

		if (this.isGameOver(this.currentCell)) {
			return;
		}

		// this if's restrict the movement if outside the grid otherwise find the nextCell
		if (movement === 'up') {
			if (this.currentCell.row < 1) return;
			nextCell = this.cells[this.currentCell.row - 1][this.currentCell.col];
		}
		if (movement === 'down') {
			if (this.currentCell.row + 1 >= this.nRows) return;
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

		// now verifing if their is a wall in between the nextCell and currentCell
		if (nextCell && nextCell.isConnectedTo(this.currentCell)) {
			// condition used for taking the player a step back from the current position
			if (
				this.myPath.length > 1 &&
				this.myPath[this.myPath.length - 1 - 1].equals(nextCell)
			) {
				this.drawPath(this.myPath, this.cellBackground);
				this.myPath.pop();
			} else {
				// the cells are connected and we are not tracing the path backwards but moving forwards
				this.myPath.push(nextCell);
				if (nextCell.equals(this.cells[this.nRows - 1][this.nColumns - 1])) {
					this.drawPath(this.myPath);
				}
			}
			this.drawPath(this.myPath);
			this.currentCell = nextCell;
		}
	}

	// Draw the path which we pass
	private drawPath(path: Cell[], color = this.myPathColor, lineThickness = this.myPathThickness) {
		this.context.lineWidth = lineThickness;
		this.context.strokeStyle = color;
		this.context.beginPath();
		this.context.moveTo(0, this.cellSize / 2);

		path.forEach((x) =>
			this.context.lineTo((x.col + 0.5) * this.cellSize, (x.row + 0.5) * this.cellSize)
		);
		this.context.stroke();
	}
}
