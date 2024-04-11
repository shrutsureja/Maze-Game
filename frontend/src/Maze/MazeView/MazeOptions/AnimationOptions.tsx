import { useState } from 'react';

function AnimationOptions(props: any) {
	const { animationsSpeed, setAnimationSpeed, status, setStatus } = props;
	const [barValue, setBarValue] = useState(1500 - animationsSpeed);
	return (
		<>
			<div>AnimationOptions</div>
			{status === 'animating' && (
				<button onClick={() => setStatus('animationPaused')}>Pause</button>
			)}
			{status === 'animationPaused' && (
				<button onClick={() => setStatus('animating')}>Resume</button>
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
				onClick={() => {
					setStatus('playing');
					alert('Starting Game');
				}}
			>
				Skip
			</button>
		</>
	);
}

export default AnimationOptions;
