import { Cell } from '../Cell';
import { Path, Utils } from '../Utils';

class RecursiveBacktracking {
	private cells: Cell[][] = [];
	private animationPath: Path[] = [];
	private randomRowNumbers: number[] = [];
	private randomColNumbers: number[] = [];
	private cellStack: Cell[] = [];

	constructor(
		public row: number,
		public col: number,
		public animation: boolean,
		cells: Cell[][] = []
	) {
		this.cells = cells;

		if (this.cells.length === 0) {
			throw new Error('Number of Cells = 0');
		}
		for (let i = 0; i < row; i++) {
			this.randomRowNumbers.push(i);
		}
		for (let i = 0; i < col; i++) {
			this.randomColNumbers.push(i);
		}
		this.randomColNumbers = Utils.shuffleArray<number>(this.randomColNumbers);
		this.randomRowNumbers = Utils.shuffleArray<number>(this.randomRowNumbers);
	}

	private addCellToAnimationPath(c: Cell) {
		this.animationPath.push({ row: c.row, col: c.col });
	}

	// Algorithm
	// Recursive Backtracking
	// 1. Choose a random starting cell
	// 2. Mark the current cell as visited
	// 3. While the current cell has any unvisited neighbor cells
	//   1. Choose one of the unvisited neighbors
	//   2. Push the current cell to the stack
	//   3. Remove the wall between the current cell and the chosen cell
	//   4. Make the chosen cell the current cell and mark it as visited
	// 4. If there are no unvisited neighbors
	//   1. Pop a cell from the stack
	//   2. Make it the current cell
	// 5. Repeat until the stack is empty
	// 6. Done
	// Make

	private recursiveBacktracking(): void {
		// Selected Random Cell
		let currentCell = this.cells[~~(Math.random() * this.row)][~~(Math.random() * this.col)];

		currentCell.visited = true;
		this.cellStack.push(currentCell);
		this.addCellToAnimationPath(currentCell);

		while (this.cellStack.length > 0) {
			const next = currentCell.neighbors.find((c) => !c.visited);
			if (next) {
				// add cell to stack
				this.cellStack.push(currentCell);
				// remove wall between current cell and chosen cell
				currentCell.connectTo(next);
				// make chosen cell the current cell and mark it as visited
				currentCell = next;
				currentCell.visited = true;
				this.addCellToAnimationPath(currentCell);
			} else {
				// Pop a cell from the stack
				currentCell = this.cellStack.pop() as Cell;
				this.addCellToAnimationPath(currentCell);
			}
		}
	}

	getGeneratedMaze(): Cell[][] {
		this.recursiveBacktracking();
		return this.cells;
	}

	getAnimationPath(): Path[] {
		return this.animationPath;
	}
}

export { RecursiveBacktracking };
