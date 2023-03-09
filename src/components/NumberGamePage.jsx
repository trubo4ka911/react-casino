import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addGameToHistory, updateGameHistoryBalance } from '../redux/gameHistorySlice';
import Modal from './Modal';
import "../sass/components/LoginPage.scss";

function NumberGamePage() {
  const deposit = useSelector((state) => state.balance.deposit);
  const balance = useSelector((state) => state.balance.currentBalance);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);
  const [updatedBalance, setUpdatedBalance] = useState(balance);
  const [showDescription, setShowDescription] = useState(false);

  const onGuessChange = (event) => {
    const input = event.target.value;
    if (/^\d$/.test(input)) {
      setGuess(input);
    }
  };

  const onPlay = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    const betAmount = deposit * 0.05;
    if (+guess === randomNumber) {
      dispatch(updateGameHistoryBalance(balance + betAmount * 10));
      dispatch(addGameToHistory({ game: 'Number', result: 'win' }));
      setResult('win');
    } else {
      dispatch(updateGameHistoryBalance(balance - betAmount));
      dispatch(addGameToHistory({ game: 'Number', result: 'lose' }));
      setResult('lose');
    }
    const newBalance = +guess === randomNumber ? updatedBalance + betAmount * 9 : updatedBalance - betAmount;
    if (newBalance <= 0) {
      navigate('/try-again');
    } else if (newBalance >= deposit * 2) {
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
  const handleShowDescription = () => {
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
  };

  return (
    <div className='number-game-page'>
      <h2>Number Game</h2>
      <p className='balance'>Deposit: {deposit.toFixed(2)}</p>
      <p className='balance'>Current balance: {updatedBalance.toFixed(2)}</p>      
      <button className='description-button' onClick={handleShowDescription}>Show Game Description</button>
      <Modal isOpen={showDescription} handleClose={handleCloseDescription} className="modal-overlay">
        <div>
            <p>
              Every time you click on the "Try" button, 5% of your initial deposit is deducted from your balance. The program generates a random value between 1 and 10, if your choice matches the generated value, you will receive ten times the amount you bet, otherwise you lose the deducted amount from your balance.
            </p>
        </div>
      </Modal>
      {result === null ? (
        <div className='number-game-container'>
          <label id='guess-label' htmlFor='guess'>Guess a number between 0 and 9:</label>
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
            <Link className='btn-color' to='/home-page'>Change game</Link>
            <Link className='btn-color' to='/'>Log Out</Link>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-result">{`The number was ${result === 'win' ? 'correct' : 'incorrect'}. You ${result}!`}</p>
          <div className="game-result-buttons">
          <button type='button' onClick={onTryAgain}>
            Try Again
          </button>
          <button type='button' onClick={onEndGame}>
            End Game
          </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NumberGamePage;
