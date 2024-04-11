function PlayOptions(props: any) {
	const { setStatus, timer } = props;
	return (
		<>
			<div className="playoption">
				<div className="pausebutton">
					<button className="pausebut" onClick={() => setStatus('gamePaused')}>
						Pause
					</button>
				</div>
				<div className="stopbutton">
					<button className="stopbut" onClick={() => setStatus('finished')}>
						Stop
					</button>
				</div>
				<div className="timer">
					<label>Timer: {timer}s</label>
				</div>
			</div>
			{/* <div>PlayOptions</div> */}
		</>
	);
}

export default PlayOptions;
