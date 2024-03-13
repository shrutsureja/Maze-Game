import './App.css'
import MazeGame from './Maze/MazeGame'
import UnderDevelopment from './components/UnderDevelopment'
import { inject } from '@vercel/analytics'

inject();
function App() {

  return (
    <>
      <UnderDevelopment/>
      <MazeGame/>
    </>
  )
}

export default App
