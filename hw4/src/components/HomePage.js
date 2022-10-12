/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState, useEffect } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [col1, setcol1] = useState(10);      // A boolean variable. If true, the controlPanel will show.
  const [col2, setcol2] = useState(8);
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  useEffect( () => {
    checkcol();
    mineNumOnChange(col1);
  }, [col1]);

  useEffect( () => {
    checkcol();
    boardSizeOnChange(col2);
  }, [col2]);
  
  const difficultyAdjustment = (e) => {
    e.target.nextSibling.style.display = 'flex';
  }

  const checkcol = () => {
    if ( col1 >= (col2*col2) ){
      document.getElementsByClassName('error')[0].style.visibility = 'visible';
      setError(true);
      document.getElementsByClassName('controlNum')[0].style.color = '#880000';
      document.getElementsByClassName('controlNum')[1].style.color = '#880000';
    }else{
      document.getElementsByClassName('error')[0].style.visibility = 'hidden';
      setError(false);
      document.getElementsByClassName('controlNum')[0].style.color = '#0f0f4b';
      document.getElementsByClassName('controlNum')[1].style.color = '#0f0f4b';
    }
  }

  const start = () => {
    if (error === false) startGameOnClick();
  }

  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      <button className='btn' onClick={() => start()}>Start Game</button>
      <div className = 'controlContainer'>
        <button className='btn' onClick={difficultyAdjustment}>Difficulty Adjustment</button>
        <div className = 'controlWrapper'>
          <div className='error'>ERROR: Mines number and board size are invalid!</div>
          <div className='controlPanel'>
            <div className = 'controlCol'>
              <p className = 'controlTitle'>Mines Number</p>
              <input type='range' step='1' min='1' max='50' 
                     value={col1} onChange={(e)=>{setcol1(e.target.value)}} defaultValue={mineNum}/>
              <p className='controlNum'>{col1}</p>
            </div>
            <div className = 'controlCol'>
              <p className = 'controlTitle'>Board Size (n*n)</p>
              <input type='range' step='1' min='1' max='20' 
                     value={col2} onChange={(e)=>{setcol2(e.target.value)}} defaultValue={boardSize}/>
              <p className='controlNum'>{col2}</p>
            </div>
          </div>
        </div>
      </div>
    {/* Advanced TODO: Implementation of Difficult Adjustment
            Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
            Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
            Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}

    </div>
  );

}
export default HomePage;   