/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"
let timeIntervalId;

export default function Dashboard({ remainFlagNum, gameOver, win }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);
  // Advanced TODO: Implement the timer on the Dashboard
  {/* Useful Hint: Try to understand the difference between time and sTime. */ }

  useEffect(() => {
    setTimeout(() => {
      let tt = time + 1;
      setTime(tt);
    }, 1000);
    if(gameOver === true||win === true){
      setTime(0);
    }
  }, [time]);

  useEffect(() => {
    let t1 = time;
    setSTime(t1);
  }, [gameOver]);

  useEffect(() => {
    let t1 = time;
    setSTime(t1);
  }, [win]);


  return (
    <div className="dashBoard" >
      <div id='dashBoard_col1' >
        <div className='dashBoard_col'>
          <p className='icon'>🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id='dashBoard_col2' >
        <div className='dashBoard_col'>
          <p className='icon'>⏰</p>
          {(gameOver||win) ? sTime : time}
          {/*time*/}
        </div>
      </div>
    </div>
  );
}
