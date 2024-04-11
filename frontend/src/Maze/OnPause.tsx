const OnPause = (props: any) => {
	const { setStatus, timer } = props;
	return (
		<>
			<div className="pausedgame">
				<h1>Game is Paused</h1>
			</div>
			<div className="pausearea">
				<label className="timediv">Time: {timer}s</label>
				<button className="playdiv" onClick={() => setStatus('playing')}>
					Resume
				</button>
				<button className="newgamediv" onClick={() => setStatus('home')}>
					New Game
				</button>
				<button className="finisheddiv" onClick={() => setStatus('finished')}>
					Exit
				</button>
			</div>
		</>
	);
};

export default OnPause;
