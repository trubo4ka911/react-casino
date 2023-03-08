import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addGameToHistory, updateBalance } from '../redux/gameHistorySlice';
import Modal from './Modal';
import '../sass/styles.scss';

function CoinGamePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const balance = useSelector((state) => state.balance.currentBalance);

  const [selectedSide, setSelectedSide] = useState('');
  const [result, setResult] = useState(null);
  const [winningSide, setWinningSide] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [updatedBalance, setUpdatedBalance] = useState(balance);

  const onSideSelected = (side) => {
    setSelectedSide(side);
  };

  const onPlay = () => {
    const randomSide = Math.random() < 0.5 ? 'heads' : 'tails';
    setWinningSide(randomSide);
    const betAmount = updatedBalance * 0.05;
    if (selectedSide === randomSide) {
      dispatch(updateBalance(updatedBalance + betAmount * 2));
      dispatch(addGameToHistory({ game: 'Coin', result: 'win' }));
      setResult('win');
    } else {
      dispatch(updateBalance(updatedBalance - betAmount));
      dispatch(addGameToHistory({ game: 'Coin', result: 'lose' }));
      setResult('lose');
    }
    const newBalance = selectedSide === randomSide ? updatedBalance + betAmount * 2 : updatedBalance - betAmount;
    if (newBalance <= 0) {
      navigate('/try-again');
    } else if (newBalance >= balance * 2) {
      navigate('/winner');
    }
    setUpdatedBalance(newBalance);
  };
  
  console.log(balance);
  

  const onTryAgain = () => {
    setSelectedSide('');
    setResult(null);
  };

  const onEndGame = () => {
    dispatch(updateBalance(updatedBalance))
    navigate('/home-page', { updatedBalance });
  };

  const handleShowDescription = () => {
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
  };

  return (
    <div className="coin-game-page">
      <h2>Coin Game</h2>
      <p className='balance'>Current balance: {updatedBalance.toFixed(2)}</p>
      <button className='description-button' onClick={handleShowDescription}>Show Game Description</button>
<Modal isOpen={showDescription} handleClose={handleCloseDescription} className="modal-overlay">
  <div>
    <p>
      Each time you click heads or tails, 5% of your initial balance is deducted from your balance. The program generates a random value, if your choice matches the generated value, you double your bet, otherwise you lose the deducted amount from your balance.
    </p>
  </div>
</Modal>

      {result === null ? (
        <div className="coin-game-container">
          <div className="coin-buttons">
            <button
              className="coin-button heads"  type="button"
              onClick={() => onSideSelected('heads')}>
            </button>
            <button
              className="coin-button tails"
              type="button"
              onClick={() => onSideSelected('tails')}>
            </button>
          </div>
          <button
            type="button"
            onClick={onPlay}
            disabled={!selectedSide}>
            Play
          </button>
          <div className='link-buttons'>
            <Link className='btn-color' to='/add-funds'>Add Funds</Link>
            <Link className='btn-color' to='/'>Log Out</Link>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-result">{`The coin landed on ${winningSide}. You ${result}!`}</p>
          <div className="game-result-buttons">
            <button
              className="action-button try-again-button"
              type="button"
              onClick={onTryAgain}>
              Try Again
            </button>
            <button
              className="action-button end-game-button"
              type="button"
              onClick={onEndGame}>
              End Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
  }
  export default CoinGamePage;
      
