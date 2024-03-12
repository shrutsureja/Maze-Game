function PlayOptions(props : any ) {
  const { setStatus, timer } = props;
  return (
    <>
      <div>PlayOptions</div>
      <button onClick={() => setStatus('paused')}>Pause</button>
      <button onClick={() => setStatus('finished')}>Stop</button>
      <label>{timer}s</label>
    </>
  )
}

export default PlayOptions