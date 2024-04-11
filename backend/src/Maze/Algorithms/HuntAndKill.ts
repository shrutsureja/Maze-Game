import { Cell } from '../Cell';
import { Utils, Path } from '../Utils';

class HuntAndKill {
	// Initialling the variables
	private cells: Cell[][] = [];
	private randomRowNumbers: number[] = [];
	private randomColNumbers: number[] = [];
	private animationPath: Path[] = [];

	// initializing the random array and checking the inputs
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

	// Algorithm's Kill Function
	private kill(cell: Cell): void {
		while (cell) {
			const next = cell.neighbors.find((c) => !c.visited);
			this.addCellToAnimationPath(cell);
			if (next) {
				cell.connectTo(next);
			}
			if (next === undefined) {
				return;
			}
			cell = next;
		}
	}
	// Algorithm's Hunt Function
	private hunt(): Cell | undefined {
		for (const r of this.randomRowNumbers) {
			for (const c of this.randomColNumbers) {
				const newCell = this.cells[r][c];
				if (newCell.visited) continue;
				const next = newCell.neighbors.find((c) => c.visited);
				if (next) {
					newCell.connectTo(next);
					return newCell;
				}
			}
		}
		return undefined;
	}
	// Algorithm
	private huntAndKillAlgorithm() {
		let currentCell = this.cells[~~(Math.random() * this.row)][~~(Math.random() * this.col)];
		// this.addCellToAnimationPath(currentCell);
		while (currentCell) {
			this.kill(currentCell);
			const temp = this.hunt();
			if (temp === undefined) {
				return;
			}
			currentCell = temp;
		}
	}

	// Mazw that gets returned
	getGeneratedMaze(): Cell[][] {
		this.huntAndKillAlgorithm(); // this generates the maze and sets it to the cells
		return this.cells;
	}

	// Animation Path with gets returned
	getAnimationPath(): Path[] {
		return this.animationPath;
	}
}

export { HuntAndKill };
