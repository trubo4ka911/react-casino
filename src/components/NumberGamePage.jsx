import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addGameToHistory, updateBalance } from '../redux/gameHistorySlice';
import '../sass/NumberGamePage.scss';

function NumberGamePage() {
  const balance = useSelector((state) => state.balance.currentBalance);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);
  const [updatedBalance, setUpdatedBalance] = useState(balance);

  const onGuessChange = (event) => {
    const input = event.target.value;
    if (/^\d$/.test(input)) {
      setGuess(input);
    }
  };

  const onPlay = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    const betAmount = balance * 0.05;
    if (+guess === randomNumber) {
      dispatch(updateBalance(balance + betAmount * 10));
      dispatch(addGameToHistory({ game: 'Number', result: 'win' }));
      setResult('win');
    } else {
      dispatch(updateBalance(balance - betAmount));
      dispatch(addGameToHistory({ game: 'Number', result: 'lose' }));
      setResult('lose');
    }
    const newBalance = +guess === randomNumber ? updatedBalance + betAmount * 9 : updatedBalance - betAmount;
    if (newBalance <= 0) {
      navigate('/try-again');
    } else if (newBalance >= balance * 2) {
      navigate('/winner');
    }
    setUpdatedBalance(newBalance);
  };

  const onTryAgain = () => {
    setGuess('');
    setResult(null);
  };

  const onEndGame = () => {
    navigate('/', { updatedBalance: balance });
  };

  return (
    <div className='number-game-page'>
      <h2>Number Game</h2>
      <p className='balance'>Current balance: ${updatedBalance.toFixed(2)}</p>
      {result === null ? (
        <div className='number-game-container'>
          <label htmlFor='guess'>Guess a number between 0 and 9:</label>
          <input 
            id='guess'
            type='text' 
            value={guess} 
            onChange={onGuessChange} 
            maxLength='1'
            placeholder='0-9'
            />
          <br />
          <button 
            type='button' 
            onClick={onPlay} 
            disabled={guess === ''}>
            Try
          </button>
          <div className='link-buttons'>
            <Link className='btn-color' to='/add-funds'>Add Funds</Link>
            <Link className='btn-color' to='/'>Log Out</Link>
          </div>
        </div>
      ) : (
        <div>
          <p>{`The number was ${result === 'win' ? 'correct' : 'incorrect'}. You ${result}!`}</p>
          <button type='button' onClick={onTryAgain}>
            Try Again
          </button>
          <button type='button' onClick={onEndGame}>
            End Game
          </button>
        </div>
      )}
    </div>
  );
}

export default NumberGamePage;
