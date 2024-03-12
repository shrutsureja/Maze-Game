
const OnGameOver = (props : any) => {
  const { setStatus, timer } = props;
  return <>
    <div>
      <h1>Game Over</h1>
    </div>
    <label> Time used : {timer}s </label>
    <button onClick={() => setStatus('home')}>new Game </button>
  </>
}

export default OnGameOver;