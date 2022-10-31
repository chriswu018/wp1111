import { useState } from 'react';
import './App.css';
import { guess, startGame, restart } from './axios';

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const clickStart = async () => {
    const response = await startGame()
    setStatus(response)
    setHasStarted(true)
  }

  const clickRestart = async () => {
    const response = await restart()
    setStatus(response)
    setHasWon(false)
    setNumber('')
  }


  const handleGuess = async () => {
    const response = await guess(number)
    if (response === 'Equal'){
      setHasWon(true)
    }
    else {
      setStatus(response)
      setNumber('')
    }
  }


  const startMenu =
    <div>
      <button onClick ={clickStart}> start game </button>
    </div>

  const gameMode =
    <>
      <p>Guess a number between 1 to 100</p>
      <input
      value = {number}
      onChange={(e)=>{setNumber(e.target.value)}}
      ></input>
      <button // Send number to backend
      onClick={handleGuess}
      disabled={!number}
      >guess!</button>
      <p>{status}</p>
    </>

  const winningMode =
    <>
      <p>
        you won! the number was {number}.
      </p>
      <button
      onClick={clickRestart}
      >restart</button>
    </>

  return(
  <div className="App">
  {hasWon ? winningMode : (hasStarted ? gameMode : startMenu) }
  </div>)
}

export default App;
//(hasStarted ? gameMode : startMenu)