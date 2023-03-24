import React, { useEffect } from "react";
import { useState } from "react";

export default function Game() {
    const [numsToSelect, setNumsToSelect] = useState([1]);
    const [playerNums, setPlayerNums] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [playerDidFail, setPlayerDidFail] = useState(false);
    const [playerDidWin, setPlayerDidWin] = useState(false);
    const [start, setStart] = useState(true);
    const [numButtonsHidden, setNumButtonsHidden] = useState(false);
    const [nums, setNums] = useState([])
    const [showReadyButton, setShowReadyButton] = useState(false);

    useEffect(() => {
        const newNums = [];
        for (let i = 1; i < 31; i++) {
            newNums.push(i)
        }
        setNums(newNums);
    }, [])

    const randomSort = (a, b) => {
        return Math.random() - 0.5;
    }

    const makeNumButtonsDisabled = (bool) => {
        const numButtons = document.querySelectorAll(".num-buttons");
        numButtons.forEach((button) => {
            button.disabled = bool;
        });
    }

    useEffect(() => {
        makeNumButtonsDisabled(true);
    }, [])

    const handleStart = () => {
        setStart(false);
        const sortedNums = [...nums].sort(randomSort);
        setNums(sortedNums);
        setNumButtonsHidden(false);
        setShowReadyButton(true);
        makeNumButtonsDisabled(true);
    }

    // checks if user inputs correct numbers
    useEffect(() => {
        playerNums.forEach((num, ind) => {
            if (num != numsToSelect[ind]) {
                setPlayerDidFail(true);
                return;
            }
        if (playerNums.length == numsToSelect.length) {
            setPlayerDidWin(true);
        }
        })
    }, [playerNums])

    // handles failed game
    useEffect(() => {
        if (playerDidFail) {
            setNumsToSelect([]);
            setPlayerNums([]);
            setNumButtonsHidden(false);
            makeNumButtonsDisabled(true);
            setScore(0);
            if (score > highScore) {
                setHighScore(score);
            }
        }
    }, [playerDidFail])

    // hides buttons for round win
    useEffect(() => { 
        if (playerDidWin) {
            makeNumButtonsDisabled(true);
            setScore((prev) => prev + 1);
        }
        
        setNumButtonsHidden(false);


    }, [playerDidWin])

    // sets array for user selected nums
    const buttonHandler = (e) => {
        setPlayerNums(prev => [...prev, e.target.value]);
    }

    const readyHandler = () => {
        makeNumButtonsDisabled(false);
        setNumButtonsHidden(true);
        setShowReadyButton(false);
    }

    // next round handler
    const nextHandler = () => {
        nums.sort(randomSort);
        setNumButtonsHidden(false);
        const newNumber = numsToSelect.length + 1;
        setNumsToSelect((prev) => [...prev, newNumber])
        setPlayerNums([]);
        setPlayerDidFail(false);
        setPlayerDidWin(false);
        setShowReadyButton(true);
        
    }

    return (
        <div> 
            <h1>High Score: {highScore}</h1>
            <h2>Score: {score}</h2>
            {playerDidFail && <h1>YOU FAILED</h1>}
            {(playerDidWin && !playerDidFail) && <h1>You Win!</h1>}
            <div className="num-buttons-container">
                { 
                    start ? 
                        (nums.map(num => (
                            <button className="num-buttons">??</button>
                        ))) :

                    (!numButtonsHidden ? 
                        (nums.map(num => { 
                            if (num > numsToSelect.length){ 
                                return (<button className="num-buttons" value={num} onClick={buttonHandler}>{num}</button>)
                            } else {
                                return (<button style={{'backgroundColor':'#4CAF50', 'color': 'white'}} className="num-buttons" value={num} onClick={buttonHandler}>{num}</button>)
                            }
                        }
                        )) :
                        (nums.map(num => (
                            <button className="num-buttons" value={num} onClick={buttonHandler}>??</button>
                        )))
                        )
                }
            </div>
            <br/>
            {(!start && !playerDidFail && !playerDidWin && showReadyButton) && <button className="game-button" onClick={readyHandler}>Ready</button>}
            <br/>
            <br/>
            
            {(playerDidWin && !start && !playerDidFail) && <button className="game-button" onClick={nextHandler}>Next</button>}
            <br/>
            <br/>
            {playerDidFail && <button className="game-button" onClick={nextHandler}>Play Again?</button>}
            {start && <button onClick={handleStart}>Start</button>}



            <br/>
            <br/>
            <br/>
        </div>
    )
}