function PlayOptions(props : any ) {
  const { setStatus } = props;
  return (
    <>
      <div>PlayOptions</div>
      <button onClick={() => setStatus('paused')}>Pause</button>
      <button onClick={() => setStatus('finished')}>Stop</button>   
    </>
  )
}

export default PlayOptions