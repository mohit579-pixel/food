import React, { useState } from 'react';
import './App.css';
import Card from './components/Card/Card.jsx';
import isWinner from './helper/isWinner.js';

function App() {
  const [turn, setTurn] = useState(true);
  const numberofbox = 9;
  const [boxes, setBoxes] = useState(new Array(numberofbox).fill(""));
  const [winner, setWinner] = useState(""); // Initialize winner as an empty string

  function play(index) {
    const symbol = turn ? 'O' : 'X'; // Determine the current player's symbol
    let newBoxes = [...boxes];
    newBoxes[index] = symbol;
    setBoxes(newBoxes);
    setTurn(!turn);

    const win = isWinner(newBoxes, symbol); // Check for winner using the correct symbol
    if (win) {
      setWinner(symbol); // Update winner with the winning symbol
    }
  }

  return (
    <>
      <div className='grid'>
        {
          winner && (
            <h1 className='heading'>Winner is {winner}</h1> // Display the winner symbol
          )
        }
        <h1 className='heading'>Player turn {turn ? 'X' : 'O'}</h1>
        {boxes.map((el, idx) => <Card key={idx} index={idx} player={el} onPlay={play} />)}
      </div>
    </>
  );
}

export default App;
