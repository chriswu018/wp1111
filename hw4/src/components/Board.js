/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(-1);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                     // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    useEffect(() => {
        if(nonMineCount === 0) setWin(true);
    }, [nonMineCount]);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        setBoard(newBoard.board);
        setNonMineCount(() => boardSize*boardSize - newBoard.mineLocations.length);
        setRemainFlagNum(newBoard.mineLocations.length);
        setMineLocations(newBoard.mineLocations);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        if(newBoard[x][y].revealed === false){
            if(newBoard[x][y].flagged === true){
                newBoard[x][y].flagged = false;
                newFlagNum += 1;
            }else if(remainFlagNum > 0){
                newBoard[x][y].flagged = true;
                newFlagNum -= 1;
            }
            setRemainFlagNum(newFlagNum)
            setBoard(newBoard);
        }
        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end

    }

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let ifBoom = false;
        let newBoard = JSON.parse(JSON.stringify(board));
        for (let i=0;i<mineLocations.length;i++){
            if(x === mineLocations[i][0] && y === mineLocations[i][1]){
                ifBoom = true;
            }
        }
        if(ifBoom === true){
            for (let i=0;i<mineLocations.length;i++){
                if (board[mineLocations[i][0]][mineLocations[i][1]].revealed || 
                    board[mineLocations[i][0]][mineLocations[i][1]].flagged) continue;
                revealed(newBoard, mineLocations[i][0], mineLocations[i][1], nonMineCount)
            }
            setBoard(newBoard);
            setGameOver(true);
        }else{
            setNonMineCount(revealed(newBoard, x, y, nonMineCount).newNonMinesCount);
            setBoard(newBoard);
        }
        

        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.

    }

    let indexOut = 0;
    let rowId = '';
    if (win || gameOver){
        return (
            <div className='boardPage' >
                <div className='boardWrapper' >
                    <div className='boardContainer'>
                        <Dashboard
                        remainFlagNum = {remainFlagNum}
                        gameOver = {gameOver}
                        win = {win}
                        />
                        {
                        board.map( function(row, index){
                                indexOut = index
                                rowId = 'row' + index
                                return (
                                    <div id={rowId} style={{display:'flex'}}>
                                        {row.map( function(e, index){
                                            return(
                                                <Cell
                                                rowIdx = {indexOut}
                                                colIdx = {index}
                                                detail = {e}
                                                updateFlag = {updateFlag}
                                                revealCell = {revealCell}/>
                                            )
                                        }
                                    )}
                                    </div>
                                )
                            }
                        )
                        }
                    </div>
                    <Modal
                    restartGame = {restartGame}
                    backToHome = {backToHome}
                    gameOver = {gameOver}
                    win = {win}/>
                </div>
            </div>
        );
    }
    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                <div className='boardContainer'>
                    <Dashboard
                    remainFlagNum = {remainFlagNum}
                    gameOver = {gameOver}
                    win = {win}
                    />
                    {
                    board.map( function(row, index){
                            indexOut = index
                            rowId = 'row' + index
                            return (
                                <div id={rowId} style={{display:'flex'}}>
                                    {row.map( function(e, index){
                                        return(
                                            <Cell
                                            rowIdx = {indexOut}
                                            colIdx = {index}
                                            detail = {e}
                                            updateFlag = {updateFlag}
                                            revealCell = {revealCell}/>
                                        )
                                    }
                                )}
                                </div>
                            )
                        }
                    )
                    }
                </div>
            </div>
        </div>
    );



}

export default Board