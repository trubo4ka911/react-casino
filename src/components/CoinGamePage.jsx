import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGameToHistory, updateBalance } from '../redux/gameHistorySlice';
import "../sass/CoinGamePage.scss";

function CoinGamePage() {
  const [selectedSide, setSelectedSide] = useState('');
  const [result, setResult] = useState(null);
  const [winningSide, setWinningSide] = useState(null);



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const balance = useSelector((state) => state.balance);

  const onSideSelected = (side) => {
    setSelectedSide(side);
  };

  const onPlay = () => {
    const randomSide = Math.random() < 0.5 ? 'heads' : 'tails';
    setWinningSide(randomSide);
    if (selectedSide === randomSide) {
      dispatch(updateBalance(balance + 10));
      dispatch(addGameToHistory({ game: 'Coin', result: 'win' }));
      setResult('win');
    } else {
      dispatch(updateBalance(balance - 5));
      dispatch(addGameToHistory({ game: 'Coin', result: 'lose' }));
      setResult('lose');
    }
  };
  
  

  const onTryAgain = () => {
    setSelectedSide('');
    setResult(null);
  };

  const onEndGame = () => {
    navigate('/home');
  };

  return (
    <div className='coin-game-page'>
      <h2>Coin Game</h2>
      {result === null ? (
        <div>
          <button type="button" onClick={() => onSideSelected('heads')}>
            Heads
          </button>
          <button type="button" onClick={() => onSideSelected('tails')}>
            Tails
          </button>
          <br />
          <button type="button" onClick={onPlay} disabled={!selectedSide}>
            Play
          </button>
        </div>
      ) : (
        <div>
          <p>{`The coin landed on ${winningSide}. You ${result}!`}</p>
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

export default CoinGamePage;
