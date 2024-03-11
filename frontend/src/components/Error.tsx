function Error(props : any) {
  const { error } = props;
  return <>
    <div>Error has occured.</div>
    { error !==null && (<p>{error}</p>)}
  </>
}

export default Error