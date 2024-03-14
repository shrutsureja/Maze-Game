import { useState } from "react"

const algorithmsUsed = [
  {id: 1 , label : 'Hunt and Kill'},
  {id: 2 , label : 'Recursive Backtracking'}
]

export default function HomeOptions(props : any) {
  const { fetchMazeData, setStatus } = props;
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);
  const [animationStatus, setAnimationStatus] = useState<boolean>(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<{id : number, label : string}>(algorithmsUsed[0]);

  function handleFetchMazeData(){
    if(animationStatus){
      setStatus('animating');
    }
    else {
      setStatus('playing');
    }
    fetchMazeData(rows, columns, animationStatus, selectedAlgorithm.label);
  }

  return (
    <div>
      <form onSubmit={handleFetchMazeData}>
        <button type="submit">Start</button>
        <input min={1} max={100} type="number" placeholder="Rows" required onChange={(e) => setRows(Number(e.target.value))}/>
        <input min={1} max={100} type="number" placeholder="Columns" required onChange={(e) => setColumns(Number(e.target.value))}/>
        <label>
          <input type="checkbox" onChange={(e) => setAnimationStatus(Boolean(e.target.checked))}/>
          Animation
        </label>
        <select disabled value={selectedAlgorithm ? selectedAlgorithm.id : ""} required onChange={(e) => setSelectedAlgorithm(algorithmsUsed.find(algo => algo.id === parseInt(e.target.value)) || algorithmsUsed[0])}>
          {algorithmsUsed.map((algo) => (<option value={algo.id} key={algo.id}>{algo.label}</option>))}
        </select>
      </form>
    </div>
  )
}