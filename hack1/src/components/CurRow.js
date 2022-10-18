/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                <div id = {''+rowIdx+'_'+0} key = {''+rowIdx+'_'+0} className='Row-wordbox'>
                    {curGuess[0]}
                </div>
                <div id = {''+rowIdx+'_'+1} key = {''+rowIdx+'_'+1} className='Row-wordbox'>
                    {curGuess[1]}
                </div>
                <div id = {''+rowIdx+'_'+2} key = {''+rowIdx+'_'+2} className='Row-wordbox'>
                    {curGuess[2]}
                </div>
                <div id = {''+rowIdx+'_'+3} key = {''+rowIdx+'_'+3} className='Row-wordbox'>
                    {curGuess[3]}
                </div>
                <div id = {''+rowIdx+'_'+4} key = {''+rowIdx+'_'+4} className='Row-wordbox'>
                    {curGuess[4]}
                </div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
/*{curGuess.map((index)=>{
                    <div id = {''+rowIdx+'_'+index} key = {''+rowIdx+'_'+index} className='Row-wordbox'>
                        {curGuess[index]}
                    </div>
                })}*/
