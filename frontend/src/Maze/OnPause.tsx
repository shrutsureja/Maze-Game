
const OnPause = (props : any) => {
  const {setStatus} = props;
  return <>
    <div>
      <h1>
        Game is Paused
      </h1>
    </div>
    <button onClick={() => setStatus('playing')}>Resume</button>
    <button onClick={() => setStatus('home')}>New Game</button>
    <button onClick={() => setStatus('finished')}>Exit</button>
  </>
}

export default OnPause;