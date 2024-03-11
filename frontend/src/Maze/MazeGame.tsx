import { useState } from "react";
import OnPause from "./OnPause";
import OnGameOver from "./OnGameOver";
import HomeOptions from "./MazeView/MazeOptions/HomeOptions";
import axios from 'axios';
import MazeBoard from "./MazeView/MazeBoard/MazeBoard";
import PlayOptions from "./MazeView/MazeOptions/PlayOptions";
import Error from '../components/Error';

export default function MazeGame () { 
  const [status, setStatus] = useState<'home' | 'animating' | 'playing' | 'paused' | 'finished'>('home');
  const [mazeData, setMazeData] = useState(null);
  const [error , setError ] = useState(false);
  async function fetchMazeData(rows : number, columns : number, animationStatus : boolean, selectedAlgorithm : string) {
    alert(rows + " " + columns + " " + animationStatus + " " + selectedAlgorithm);
    try{
      let body = JSON.stringify({
        "algorithmName": "Hunt and Kill",
        "rows": rows,
        "columns": columns,
        "animation": animationStatus
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/generate',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : body
      };
      
      const data = await axios.request(config)
      console.log(data.data.data.maze); 
      setMazeData(data.data.data.maze);
    }
    catch(e){
      console.log(e);
      setError(true);
      setStatus('home')
    }
  } 

  // if error occurs in fetching the data
  if(error){
    return <Error/>
  }

  return <>
  <div>
    <h1>Maze Game</h1>
      { status === 'home' && <HomeOptions fetchMazeData={fetchMazeData} status={status} setStatus={setStatus}/>}
      { status === 'playing' && (
        <>
          <PlayOptions setStatus={setStatus} /> 
          <MazeBoard status={status} setStatus={setStatus} mazeData = {mazeData}/>
        </>
      )}
      { status === 'paused' && <OnPause setStatus={setStatus}/>}
      { status === 'finished' && <OnGameOver setStatus={setStatus} />}
    </div>
  </>
}