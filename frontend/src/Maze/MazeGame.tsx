import { useEffect, useRef, useState } from "react";
import OnPause from "./OnPause";
import OnGameOver from "./OnGameOver";
import HomeOptions from "./MazeView/MazeOptions/HomeOptions";
import axios from 'axios';
import MazeBoard from "./MazeView/MazeBoard/MazeBoard";
import PlayOptions from "./MazeView/MazeOptions/PlayOptions";
import Error from '../components/Error';
import { MazeGameEngine } from "./MazeView/MazeBoard/MazeGameEngine";

export default function MazeGame () { 
  const [status, setStatus] = useState<'home' | 'animating' | 'playing' | 'paused' | 'finished'>('home');
  const [mazeData, setMazeData] = useState(null);
  const [error , setError ] = useState(false);
  const [timer, setTimer] = useState(0);

  const baseUrl = import.meta.env.DEV ? 'http://localhost:3000' : import.meta.env.VITE_BASEURL;  
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const maze = useRef<MazeGameEngine | null>(null);

  async function fetchMazeData(rows : number, columns : number, animationStatus : boolean, selectedAlgorithm : string) {
    try{
      let body = JSON.stringify({
        algorithmName: selectedAlgorithm,
        rows: rows,
        columns: columns,
        animation: animationStatus
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: baseUrl + '/generate',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : body
      };
      
      const data = await axios.request(config)
      // need to handle the data in a more better way over here
      setMazeData(data.data.data.maze);
    }
    catch(e){
      setError(true);
      setStatus('home');
    }
  } 

  // For the time used setting
  useEffect(()=>{
    const myInterval = setInterval(()=>{
      if (status === 'playing')
        setTimer(timer + 1);
      if (status === 'home')
        setTimer(0);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    }
  }, [timer, status])

  // if error occurs in fetching the data
  if(error){
    return <Error/>
  }

  return <>
  <div>
    <h1>Maze Game</h1>
      { status === 'home' && <HomeOptions fetchMazeData={fetchMazeData} status={status} setStatus={setStatus}/>}
      { !error && status === 'playing' && <PlayOptions setStatus={setStatus} timer={timer}/> }
      { !error && (status === 'playing' || status === 'paused') && <MazeBoard status={status} setStatus={setStatus} mazeData={mazeData} canvasRef={canvasRef} context={context} maze={maze}/>}
      { !error && status === 'paused' && <OnPause setStatus={setStatus} timer={timer}/>}
      { !error && status === 'finished' && <OnGameOver setStatus={setStatus} timer={timer}/>}
    </div>
  </>
}