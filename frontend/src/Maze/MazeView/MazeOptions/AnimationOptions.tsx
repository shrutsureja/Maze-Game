import { useState } from 'react';

function AnimationOptions(props: any) {
	const { animationsSpeed, setAnimationSpeed, status, setStatus } = props;
	const [barValue, setBarValue] = useState(1500 - animationsSpeed);
	return (
		<>
			<div className="animationpage">
				{/* <div>AnimationOptions</div> */}
				<div></div>
				{status === 'animating' && (
					<button className="anipause" onClick={() => setStatus('animationPaused')}>
						Pause
					</button>
				)}
				{status === 'animationPaused' && (
					<button className="respause" onClick={() => setStatus('animating')}>
						Resume
					</button>
				)}
				<input
					type="range"
					min="50"
					max="1450"
					step={100}
					value={barValue}
					onChange={(e) => {
						setBarValue(Number(e.target.value));
						setAnimationSpeed(1500 - Number(e.target.value));
					}}
				/>
				<button
					className="aniskip"
					onClick={() => {
						setStatus('playing');
						alert('Starting Game');
					}}
				>
					Skip
				</button>
			</div>
		</>
	);
}

export default AnimationOptions;
