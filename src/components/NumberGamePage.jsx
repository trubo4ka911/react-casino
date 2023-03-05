import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGameToHistory, updateBalance } from '../redux/gameHistorySlice';
import "../sass/NumberGamePage.scss";

function NumberGamePage() {
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);
  const [winningNumber, setWinningNumber] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const balance = useSelector((state) => state.balance);

  const onGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const onPlay = () => {
    const number = Math.floor(Math.random() * 10);
    setWinningNumber(number);
    if (+guess === number) {
      dispatch(updateBalance(balance + 10));
      dispatch(addGameToHistory({ game: 'Number', result: 'win' }));
      setResult('win');
    } else {
      dispatch(updateBalance(balance - 5));
      dispatch(addGameToHistory({ game: 'Number', result: 'lose' }));
      setResult('lose');
    }
  };

  const onTryAgain = () => {
    setGuess('');
    setResult(null);
    setWinningNumber(null);
  };

  const onEndGame = () => {
    navigate('/');
  };

  return (
    <div className='number-game-page'>
      <h2>Number Game</h2>
      {result === null ? (
        <div>
          <p>Guess a number from 0 to 9:</p>
          <input type="number" value={guess} onChange={onGuessChange} />
          <br />
          <button type="button" onClick={onPlay} disabled={!guess}>
            Play
          </button>
        </div>
      ) : (
        <div>
          <p>{`The winning number was ${winningNumber}. You ${result}!`}</p>
          <button type="button" onClick={onTryAgain}>
            Try Again
          </button>
          <button type="button" onClick={onEndGame}>
            End Game
          </button>
        </div>
      )}
    </div>
  );
}

export default NumberGamePage;
