import React, { useEffect } from "react";
import { useState } from "react";

export default function Game() {
    const [numsToSelect, setNumsToSelect] = useState([1]);
    const [playerNums, setPlayerNums] = useState([]);
    const [playerDidFail, setPlayerDidFail] = useState(false);
    const [playerDidWin, setPlayerDidWin] = useState(false);

    const nums = [];
    for (let i = 1; i < 31; i++) {
        nums.push(i)
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

    useEffect(() => {
        if (playerDidFail) {
            setNumsToSelect([]);
            setPlayerNums([]);

            const numButtons = document.querySelectorAll(".num-buttons");
            numButtons.forEach((button) => {
                button.disabled = true;
            });
        }



    }, [playerDidFail])

    useEffect(() => { 
        if (playerDidWin) {
            const numButtons = document.querySelectorAll(".num-buttons");
            numButtons.forEach((button) => {
                button.disabled = true;
            });
        }

    }, [playerDidWin])

    const buttonHandler = (e) => {
        setPlayerNums(prev => [...prev, e.target.value]);
    }

    const nextHandler = () => {
        const newNumber = numsToSelect.length + 1;
        setNumsToSelect((prev) => [...prev, newNumber])
        setPlayerNums([]);
        setPlayerDidFail(false);
        setPlayerDidWin(false);
    
        const numButtons = document.querySelectorAll(".num-buttons");
        numButtons.forEach((button) => {
            button.disabled = false;
        });
    }

    return (
        <div>
            <p>Numbers To Select</p>
            <ul>
                {numsToSelect.map(num => (<li>{num}</li>))}
            </ul>
            <p>Player NUms</p>
            <ul>
                {playerNums.map(num => (<li>{num}</li>))}
            </ul>
            

            {playerDidFail && <h1>YOU FAILED</h1>}
            {(playerDidWin && !playerDidFail) && <h1>You Win!</h1>}
            <div>
            {
                nums.map(num => (
                    <button className="num-buttons" value={num} onClick={buttonHandler}>{num}</button>
                ))
            }
            </div>
            <br/>
            {!playerDidFail && <button className="next-button" onClick={nextHandler}>Next</button>}
            <br/>
            <br/>
            {playerDidFail && <button onClick={nextHandler}>Play Again?</button>}
        </div>
    )
}