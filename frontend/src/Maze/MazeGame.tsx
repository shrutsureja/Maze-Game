import { useState } from "react";
import MazeBoard from "./MazeBoard/MazeBoard";

const Algorithms = [
  {value: 1 , label : 'Hunt and Kill'},
  {value: 2 , label : 'Recursive Backtracking'}
]

const MazeGame = () => {
  
  // Input state variables
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(Algorithms[0]);
  const [mazeData, setMazeData] = useState<{
    row : number,
    col : number,
    animationStatus : boolean
  }>();
  
  console.log(mazeData);
  
  
  return <>
  <div>
    <h1>Maze Game</h1>
    
    {/* TODO : Need to add the on pause and on play logic with the game timer */}

    {/* INPUT OF THE GAMES */}
    <select value={selectedAlgorithm ? selectedAlgorithm.value : ""} onChange={(e) => setSelectedAlgorithm(Algorithms.find((algo) => algo.value === parseInt(e.target.value)) || Algorithms[0])}>
      {Algorithms.map((algo) => (
        <option value={algo.value} key={algo.value}>{algo.label}</option>
      ))}
    </select>
    <input type="number" placeholder="rows" id="rows" max="100"/>
    <input type="number" placeholder="columns" id="columns" max="100"/>
    <label htmlFor="animation">animation</label>
    <input type="checkbox" name="animation" id="animation"/>
    <button onClick={()=>{
      setMazeData({
        row : parseInt((document.getElementById('rows') as HTMLInputElement).value || '1'),
        col : parseInt((document.getElementById('columns') as HTMLInputElement).value || '1'),
        animationStatus : Boolean((document.getElementById('animation') as HTMLInputElement).value),
      });
    }}>Generate New Maze</button>

    
    <MazeBoard mazeData={{mazeData, selectedAlgorithm:selectedAlgorithm}}/>
  </div>
  </>
}

export default MazeGame;