/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                <div id = {''+rowIdx+'_'+0} key = {''+rowIdx+'_'+0} className='Row-wordbox'>
                    {guess === undefined ? "" : guess[0]}
                </div>
                <div id = {''+rowIdx+'_'+1} key = {''+rowIdx+'_'+1} className='Row-wordbox'>
                    {guess === undefined ? "" : guess[1]}
                </div>
                <div id = {''+rowIdx+'_'+2} key = {''+rowIdx+'_'+2} className='Row-wordbox'>
                    {guess === undefined ? "" : guess[2]}
                </div>
                <div id = {''+rowIdx+'_'+3} key = {''+rowIdx+'_'+3} className='Row-wordbox'>
                    {guess === undefined ? "" : guess[3]}
                </div>
                <div id = {''+rowIdx+'_'+4} key = {''+rowIdx+'_'+4} className='Row-wordbox'>
                    {guess === undefined ? "" : guess[4]}
                </div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;