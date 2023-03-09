import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addGameToHistory, updateGameHistoryBalance} from '../redux/gameHistorySlice';
import { setDeposit, updateBalanceAmount } from '../redux/balanceSlice';

import Modal from './Modal';
import '../sass/components/CoinGamePage.scss';

function CoinGamePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deposit = useSelector((state) => state.balance.deposit);
  const currentBalance = useSelector((state) => state.balance.currentBalance);
  const [updatedBalance, setUpdatedBalance] = useState(currentBalance);

  const [selectedSide, setSelectedSide] = useState('');
  const [result, setResult] = useState(null);
  const [winningSide, setWinningSide] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  const onSideSelected = (side) => {
    setSelectedSide(side);
  };
  const onPlay = () => {
    const randomSide = Math.random() < 0.5 ? "heads" : "tails";
    setWinningSide(randomSide);
    const betAmount = deposit * 0.05;
    const isWin = selectedSide === winningSide;
    const multiplier = isWin ? 2 : -1;
    const amountWon = isWin ? betAmount * 2 : betAmount;
    const newBalance = updatedBalance + amountWon * multiplier;
    dispatch(updateBalanceAmount(amountWon * multiplier));
    dispatch(updateGameHistoryBalance(newBalance));
    dispatch(addGameToHistory({ game: "Coin", result: isWin ? "win" : "lose" }));
    setResult(isWin ? "win" : "lose");
  
    if (newBalance <= 0) {
      navigate("/try-again");
    } else if (newBalance >= deposit * 2) {
      navigate("/winner");
    }
  };
  

  useEffect(() => {
    setUpdatedBalance(currentBalance);
  }, [currentBalance]);

  const onTryAgain = () => {
    setSelectedSide('');
    setResult(null);
  };

  const onEndGame = () => {
    dispatch(setDeposit({ name: '', deposit: updatedBalance }));
    navigate('/home-page');
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
      <p className="balance">Deposit: {deposit.toFixed(2)}</p>
      <p className="balance">Current balance: {updatedBalance.toFixed(2)}</p>
      <button className="description-button" onClick={handleShowDescription}>
        Show Game Description
      </button>
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
            <Link className='btn-color' to='/home-page'>Change game</Link>
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