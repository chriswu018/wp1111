/****************************************************************************
  FileName      [ useWordle.js ]
  PackageName   [ src/components/hook ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file handles each action in the Wordle game. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useState } from 'react';


const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);                            // An integer whose default is 0. 0 <= turn <= 5.
    const [usedChars, setUsedChars] = useState({});                 // A dictionary object which store characters' color that showed on the keyboard. (Ex: {e: 'yellow', c:'grey'})
    const [curGuess, setCurGuess] = useState("");                   // A string whose default is "". 0 <= curGuess.length <= 5.
    const [isCorrect, setIsCorrect] = useState(false);              // A bool whose default is false. It will be set true only when curGuess === solution.
    const [guesses, setGuesses] = useState([...Array(6)]);          // An array whose length is 6. (Ex: [[{char:'c', color:'grey'},{char:'o', color:'grey'},{char:'d', color:'grey'},{char:'e', color:'yellow'},{char:'s', color:'grey'}],[],[],[],[],[]])
    var dict = {};
    var sol = {};
    var gesarr = [];

    for (let i=0;i<5;i++){
        let char = ''+i;
        sol[solution[i]] = char;
    }


    // You can use this function to print all the parameters you want to know.
    const printTest = () => {
        console.log("*-----------------------*");
        console.log("solution: ", solution);
        console.log("solution: ", sol);
        console.log("solution: ", solution[0]);
        console.log("turn: ", turn);
        console.log("usedChars:", usedChars);
        console.log("curGuess: ", curGuess);
        console.log("isCorrect: ", isCorrect);
        console.log("guesses: ", guesses);
    }

    // Handle the actions of `Enter`
    const handleEnter = () => {
        // (1) Enter is invalid if turn > 5
        if (turn > 5) {
            console.log("Error: You have used all your guesses");
            return;
        }
        // (2) Enter is invalid if curGuess is not a 5-character string
        if (curGuess.length !== 5) {
            console.log("Error: Only ", curGuess.length, " characters are entered!");
            return;
        }
        // (3) Press Enter, store curGuess to guesses, reset curGuess and update parameters .

        // console.log("Press Enter!!!! Store and reset curGuess!");
        // TODO 4: Check each wordbox's color in `curGuess` and update `guess`, `turn` and `curGuess`
        for (let i=0;i<5;i++){
            let lt = curGuess[i];
            let ges = {};
            ges['char'] = lt;
            if(sol[lt]===i){
                dict[lt] = 'green';
                ges['color'] = 'green';
                delete sol[lt];
            }else{
                for (let j=0;j<5;j++){
                    if(j===i){
                        continue;
                    }else{
                        if(sol[lt]===j){
                            if(dict[lt] !== 'green'){
                                dict[lt] = 'yellow';
                                ges['color'] = 'yellow';
                            }
                        }else{
                            if(dict[lt] !== 'green' && dict[lt] !== 'yellow'){
                                dict[lt] = 'grey';
                                ges['color'] = 'grey';
                            }
                        }
                    }
                }
            }
            gesarr[gesarr.length] = ges;
        }
        // Hint: check green first, and then check yellow.

        // add the formatted guess generated into guesses.
        let arr2d = guesses;
        arr2d[turn] = curGuess;
        setGuesses(arr2d);

        let ct = turn + 1;
        setTurn(ct);
        
        // set curGuess to default
        setCurGuess("");


        // TODO 5: update parameters, check each char usage and show in `Keyboard` and reset `curGuess`.
        // 5-1) check if curGuess === solution, if true, set `isCorrect` to true.
        if (curGuess === solution){
            setIsCorrect(true);
        }
        
        // 5-2) usedChars update
        setUsedChars(dict);
    }

    // Handle the action of `Backspace`
    const handleBackspace = () => {
        setCurGuess(curGuess.substring(0, curGuess.length - 1));
    }

    // Handle the action of pressing a character.
    const handleCharacter = (key) => {
        // If curGuess's length is longer than 5, do nothing
        if (curGuess.length < 5){
            setCurGuess(curGuess + key);
            console.log(curGuess);
        }
    }
    const handleKeyup = ({ key }) => {
        console.log("You just press: ", key);
        if (key === 'Enter') handleEnter();
        else if (key === 'Backspace') handleBackspace();
        else if (/^[A-Za-z]$/.test(key)) handleCharacter(key);
    }


    return { turn, curGuess, guesses, isCorrect, usedChars, handleKeyup, printTest };
}

export default useWordle;
