import { useEffect, useRef } from 'react';
import { MazeGameEngine } from './MazeGameEngine';
import { mazeGridFromServer, path } from '../../../components/types';

export default function MazeBoard(props: any) {
	const { responseData, setStatus, status, animationSpeed } = props;

	// destructuring data
	let mazeGrid: mazeGridFromServer[][] | null = null;
	let animationStatus: boolean = false;
	let animationPath: path[] | null = null;
	if (responseData) {
		mazeGrid = responseData.mazeGrid;
		animationStatus = responseData.animationStatus;
		animationPath = animationStatus ? responseData.animationPath : null;
	}

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const maze = useRef<MazeGameEngine | null>(null);

	// this handles the responseData as its gets fetched this gets called
	useEffect(() => {
		if (canvasRef.current === null) {
			console.log('canvasRef is not used.');
			return;
		}
		if (mazeGrid) {
			canvasRef.current.height = mazeGrid.length * 20;
			canvasRef.current.width = mazeGrid[0].length * 20;
			context.current = canvasRef.current.getContext('2d');

			if (context.current) {
				const ctx = context.current;

				// if animation is needed
				if (status === 'animating' && animationPath !== null && animationStatus) {
					maze.current = new MazeGameEngine(mazeGrid, ctx, setStatus, animationPath);
				} else {
					maze.current = new MazeGameEngine(mazeGrid, ctx, setStatus);
				}

				// event listner
				window.onkeydown = (e) => {
					switch (e.key) {
						case 'w':
						case 'ArrowUp':
							maze.current?.moveCurrentPosition('up');
							break;
						case 's':
						case 'ArrowDown':
							maze.current?.moveCurrentPosition('down');
							break;
						case 'd':
						case 'ArrowRight':
							maze.current?.moveCurrentPosition('right');
							break;
						case 'a':
						case 'ArrowLeft':
							maze.current?.moveCurrentPosition('left');
							break;
						default:
							break;
					}
				};
			}

			// if need to animate then this
			if (animationStatus && status === 'animating') {
				// call the maze animation function
				maze.current?.animatingBoard();
			} else {
				maze.current?.renderBoard();
			}
		} else {
			console.log('maze data not loaded');
		}
	}, [responseData]);

	// used when we skip the animation or when the animation is completed
	useEffect(() => {
		if (status === 'playing') {
			maze.current?.renderBoard();
		}
	}, [status]);

	// used for the speed of animation
	useEffect(() => {
		let intervalID: any;
		if (status === 'animating') {
			intervalID = setInterval(() => {
				maze.current?.animatingNextStep();
			}, animationSpeed);
		}

		return () => {
			clearInterval(intervalID);
		};
	}, [status, animationSpeed]);

	return (
		<>
			<div
				className="mazeboard"
				style={{ display: status === 'gamePaused' ? 'none' : 'block' }}
			>
				<div className="canvasclass">
					<canvas ref={canvasRef} width={500} height={500}></canvas>
				</div>
			</div>
		</>
	);
}
