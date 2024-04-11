const OnGameOver = (props: any) => {
	const { setStatus, timer } = props;
	return (
		<>
			<div className="overbut">
				<h1>Game Over</h1>
			</div>
			<div className="newpagediv">
				<label className="newgamebut"> Time used : {timer}s </label>
				<div>
					<button className="newgamelabel" onClick={() => setStatus('home')}>
						{' '}
						new Game{' '}
					</button>
				</div>
			</div>
		</>
	);
};

export default OnGameOver;
