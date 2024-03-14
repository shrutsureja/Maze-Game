import { useEffect, useState } from "react";
import OnPause from "./OnPause";
import OnGameOver from "./OnGameOver";
import HomeOptions from "./MazeView/MazeOptions/HomeOptions";
import axios from 'axios';
import MazeBoard from "./MazeView/MazeBoard/MazeBoard";
import PlayOptions from "./MazeView/MazeOptions/PlayOptions";
import Error from '../components/Error';
import AnimationOptions from "./MazeView/MazeOptions/AnimationOptions";

// backend url for production and devlopment
const baseUrl = import.meta.env.DEV ? 'http://localhost:3000' : import.meta.env.VITE_BASEURL;  

export default function MazeGame () { 
  const [status, setStatus] = useState<'home' | 'animating' | 'animationPaused' | 'playing' | 'gamePaused' | 'finished'>('home');
  const [responseData, setResponseData] = useState(null); // holds the server data
  const [error , setError ] = useState(false); 
  const [timer, setTimer] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(750)

// fetches user data
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
        url: baseUrl + '/api/generate',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : body
      };
      
      const response = await axios.request(config);
      setResponseData(response.data.data);
    }
    catch(e){ 
      setError(true);
      setStatus('home');
    }
  } 

  // used for timer and reseting the states when we come to home again
  useEffect(()=>{
    const myInterval = setInterval(()=>{
      if (status === 'playing')
        setTimer(timer + 1);
      if (status === 'home'){
        setTimer(0);
        setAnimationSpeed(750);
        setResponseData(null)
      }
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
      { !error && (status === 'animating' || status === 'animationPaused') && <AnimationOptions animationSpeed={animationSpeed} setAnimationSpeed={setAnimationSpeed} status={status} setStatus={setStatus}/> }
      { !error && status === 'playing' && <PlayOptions setStatus={setStatus} timer={timer}/> }
      { !error && (status === 'playing' || status === 'gamePaused' || status==='animating' || status==='animationPaused') && <MazeBoard status={status} setStatus={setStatus} responseData={responseData} animationSpeed={animationSpeed}/>}
      { !error && status === 'gamePaused' && <OnPause setStatus={setStatus} timer={timer}/>}
      { !error && status === 'finished' && <OnGameOver setStatus={setStatus} timer={timer}/>}
    </div>
  </>
}