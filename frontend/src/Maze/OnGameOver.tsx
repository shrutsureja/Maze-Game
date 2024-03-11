
const OnGameOver = (props : any) => {
  const { setStatus } = props;
  return <>
    <div>
      <h1>Game Over</h1>
    </div>
    <button onClick={() => setStatus('home')}>new Game </button>
  </>
}

export default OnGameOver;