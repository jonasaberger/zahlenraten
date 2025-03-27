import { useState } from 'react';
import './GuessTheNumber.css';

function GuessTheNumber() {
  const [targetNumber, setTargetNumber] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [maxNumber, setMaxNumber] = useState(100);
  const [showVictory, setShowVictory] = useState(false);

  const startGame = () => {
    const newTarget = Math.floor(Math.random() * maxNumber) + 1;
    setTargetNumber(newTarget);
    setUserGuess('');
    setMessage('');
    setAttempts(0);
    setGameStarted(true);
    setShowVictory(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const guess = parseInt(userGuess);
    
    if (isNaN(guess)) {
      setMessage('Please enter a valid number');
      return;
    }
    
    setAttempts(attempts + 1);
    
    if (guess === targetNumber) {
      setShowVictory(true);
      setGameStarted(false);
    } else if (guess < targetNumber) {
      setMessage('Too low! Try a higher number.');
    } else {
      setMessage('Too high! Try a lower number.');
    }
    
    setUserGuess('');
  };

  return (
    <div className="game-container">
      <h1>Guess the Number Game</h1>
      
      {showVictory ? (
        <div className="victory-screen">
          <div className="speech-bubble">"Tech Death is bad"</div>
          <div className="smiley">😎</div>
          <h2>You won in {attempts} {attempts === 1 ? 'try' : 'tries'}!</h2>
          <button onClick={startGame} className="restart-button">
            Play Again
          </button>
        </div>
      ) : !gameStarted ? (
        <div className="game-setup">
          <p>Choose the maximum number:</p>
          <input
            type="number"
            value={maxNumber}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 1) setMaxNumber(value);
            }}
            min="2"
            className="number-input"
          />
          <button onClick={startGame} className="start-button">
            Start Game
          </button>
        </div>
      ) : (
        <div className="game-active">
          <p>Guess a number between 1 and {maxNumber}</p>
          <p>Attempts: {attempts}</p>
          
          <form onSubmit={handleSubmit} className="guess-form">
            <input
              type="number"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              min="1"
              max={maxNumber}
              className="guess-input"
            />
            <button type="submit" className="submit-button">
              Submit Guess
            </button>
          </form>
          
          {message && <p className="message">{message}</p>}
          
          <button onClick={startGame} className="restart-button">
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}

export default GuessTheNumber;