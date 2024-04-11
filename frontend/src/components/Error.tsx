function Error() {
	return (
		<>
			<div>Error has occured.</div>
			<button onClick={() => window.location.reload()}>Reload Page</button>
		</>
	);
}

export default Error;
