// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setBalance } from '../redux/balanceSlice';
// import { resetHistory } from '../redux/gameHistorySlice';
// import { useNavigate, Link } from 'react-router-dom';

// import '../sass/CoinGamePage.scss';

// function CoinGamePage() {
//   const [result, setResult] = useState(null);
//   const [winningSide, setWinningSide] = useState(null);
//   const [selectedSide, setSelectedSide] = useState(null);
//   const balance = useSelector(state => state.balance.balance);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onSideSelected = (side) => {
//     setSelectedSide(side);
//   };

//   const onPlay = () => {
//     const random = Math.random() < 0.5 ? 'heads' : 'tails';
//     const win = selectedSide === random;
//     const amount = win ? 0.1 : -0.05;
//     const newBalance = balance + balance * amount;

//     setResult(win ? 'won' : 'lost');
//     setWinningSide(random);
//     dispatch(setBalance(newBalance));
//   };

//   const onTryAgain = () => {
//     setResult(null);
//     setSelectedSide(null);
//     setWinningSide(null);
//   };

//   const onEndGame = () => {
//     dispatch(resetHistory());
//     dispatch(setBalance({ balance: 0 }));
//     navigate('/login');
//   };

//   const history = useSelector(state => state.gameHistory.history);
//   const lastGame = history[history.length - 1];
//   if (balance <= 0 && lastGame !== '/try-again') {
//     navigate('/try-again');
//     dispatch(resetHistory());
//   }

//   return (
//     <div className="coin-game-page">
//       <h2>Coin Game</h2>
//       {result === null ? (
//         <div className="coin-game-container">
//           <div className="coin-buttons">
//             <button
//               className={`coin-button heads ${selectedSide === 'heads' ? 'selected' : ''}`}
//               type="button"
//               onClick={() => onSideSelected('heads')}
//             >
//             </button>
//             <button
//               className={`coin-button tails ${selectedSide === 'tails' ? 'selected' : ''}`}
//               type="button"
//               onClick={() => onSideSelected('tails')}
//             >
//             </button>
//           </div>
//           <button
//             className="play-button"
//             type="button"
//             onClick={onPlay}
//             disabled={!selectedSide}
//           >
//             Play
//           </button>
//           <h3>Your balance is: {balance}</h3>
//         </div>
//       ) : (
//         <div>
//           <p className='text-result'>{`The coin landed on ${winningSide}. You ${result}!`}</p>
//           <div className="game-result-buttons">
//             <button
//               className="action-button try-again-button"
//               type="button"
//               onClick={onTryAgain}
//             >
//               Try Again
//             </button>
//             <button
//               className="action-button end-game-button"
//               type="button"
//               onClick={onEndGame}
//             >
//               End Game
//             </button>
//             </div>
//       <h3>Your balance is: {balance}</h3>
//     </div>
//   )}
// </div>
// );
// }



// export default CoinGamePage;


// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setBalance } from '../redux/balanceSlice';
// import { resetHistory } from '../redux/gameHistorySlice';
// import { useNavigate } from 'react-router-dom';
// import "../sass/CoinGamePage.scss";

// function CoinGamePage() {
//   const [guess, setGuess] = useState('');
//   const [result, setResult] = useState('');
//   const [win, setWin] = useState(false);
//   const balance = useSelector(state => state.balance.balance);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onGuessChange = (e) => {
//     setGuess(e.target.value);
//   };

//   const onPlayClick = (e) => {
//     e.preventDefault();
//     if (guess === '') {
//       setResult('Please make a guess');
//       return;
//     }
//     dispatch(setBalance(balance - (0.05 * balance)));
//     const random = Math.random() < 0.5 ? 'heads' : 'tails';
//     if (guess === random) {
//       setResult(`You won!`);
//       setWin(true);
//       dispatch(setBalance(balance + (0.1 * balance)));
//     } else {
//       setResult(`You lost!`);
//       setWin(false);
//     }
//   };

//   const onReturnClick = () => {
//     navigate('/');
//   };

//   const onStartAgainClick = () => {
//     dispatch(resetHistory());
//     dispatch(setBalance({ balance: 0 }));
//     navigate('/login');
//   };

//   const history = useSelector(state => state.gameHistory.history);
//   const lastGame = history[history.length - 1];
//   if (balance <= 0 && lastGame !== '/try-again') {
//     navigate('/try-again');
//     dispatch(resetHistory());
//   }

//   return (
//     <div className="coin-game-page">
//       <h2>Coin Game</h2>
//       <h3>Your balance is: {balance}</h3>
//       <form>
//         <label>
//           Heads or Tails:
//           <select value={guess} onChange={onGuessChange}>
//             <option value="">--Please choose an option--</option>
//             <option value="heads">Heads</option>
//             <option value="tails">Tails</option>
//           </select>
//         </label>
//         <br />
//         <button onClick={onPlayClick}>Play</button>
//         <br />
//         <h3>{result}</h3>
//         {win && (
//           <h3>Congratulations, you doubled your bet!</h3>
//         )}
//         <br />
//         <button onClick={onReturnClick}>Return to Home Page</button>
//         <button onClick={onStartAgainClick}>Start Again</button>
//       </form>
//     </div>
//   );
// }

// export default CoinGamePage;
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGameToHistory, updateBalance } from '../redux/gameHistorySlice';
import '../sass/CoinGamePage.scss';
import '../sass/Modal.scss';
import Modal from './Modal';

function CoinGamePage() {
  const [selectedSide, setSelectedSide] = useState('');
  const [result, setResult] = useState(null);
  const [winningSide, setWinningSide] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

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
    navigate('/');
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
      <button onClick={handleShowDescription}>Show Game Description</button>
      <Modal isOpen={showDescription}>
<div className="game-description">
<p>
Each time you click heads or tails, 5% of your initial deposit is
deducted from your balance. The program generates a random value,
if your choice matches the generated value, you double your bet,
otherwise you lose the deducted amount from your balance.
</p>
<button onClick={handleCloseDescription}>Close</button>
</div>
</Modal>
{result === null ? (
<div className="coin-game-container">
<div className="coin-buttons">
<button
className="coin-button heads"
type="button"
onClick={() => onSideSelected('heads')}
>
</button>
<button
className="coin-button tails"
type="button"
onClick={() => onSideSelected('tails')}
>
</button>
</div>
<button
         className="play-button"
         type="button"
         onClick={onPlay}
         disabled={!selectedSide}
       >
Play
</button>
</div>
) : (
<div>
<p className="text-result">{`The coin landed on ${winningSide}. You ${result}!`}</p>
<div className="game-result-buttons">
<button
           className="action-button try-again-button"
           type="button"
           onClick={onTryAgain}
         >
Try Again
</button>
<button
           className="action-button end-game-button"
           type="button"
           onClick={onEndGame}
         >
End Game
</button>
</div>
</div>
)}
</div>
);
}

export default CoinGamePage;



// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addGameToHistory, updateBalance } from '../redux/gameHistorySlice';
// import '../sass/CoinGamePage.scss';

// function CoinGamePage() {
//   const [selectedSide, setSelectedSide] = useState('');
//   const [result, setResult] = useState(null);
//   const [winningSide, setWinningSide] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const balance = useSelector((state) => state.balance);

//   const onSideSelected = (side) => {
//     setSelectedSide(side);
//   };

//   const onPlay = () => {
//     const randomSide = Math.random() < 0.5 ? 'heads' : 'tails';
//     setWinningSide(randomSide);
//     if (selectedSide === randomSide) {
//       dispatch(updateBalance(balance + 10));
//       dispatch(addGameToHistory({ game: 'Coin', result: 'win' }));
//       setResult('win');
//     } else {
//       dispatch(updateBalance(balance - 5));
//       dispatch(addGameToHistory({ game: 'Coin', result: 'lose' }));
//       setResult('lose');
//     }
//   };

//   const onTryAgain = () => {
//     setSelectedSide('');
//     setResult(null);
//   };

//   const onEndGame = () => {
//     navigate('/');
//   };

//   return (
//     <div className="coin-game-page">
//       <h2>Coin Game</h2>
//       <p className="game-description">Each time you click heads or tails, 5% of your initial deposit is deducted from your balance. The program generates a random value, if your choice matches the generated value, you double your bet, otherwise you lose the deducted amount from your balance.</p>
//       {result === null ? (
//         <div className="coin-game-container">
//           <div className="coin-buttons">
//             <button
//               className="coin-button heads"
//               type="button"
//               onClick={() => onSideSelected('heads')}
//             >            </button>
//             <button
//               className="coin-button tails"
//               type="button"
//               onClick={() => onSideSelected('tails')}
//             >            </button>
//           </div>
//           <button
//             className="play-button"
//             type="button"
//             onClick={onPlay}
//             disabled={!selectedSide}
//           >
//             Play
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p className='text-result'>{`The coin landed on ${winningSide}. You ${result}!`}</p>
//           <div className="game-result-buttons">
//             <button
//               className="action-button try-again-button"
//               type="button"
//               onClick={onTryAgain}
//             >
//               Try Again
//             </button>
//             <button
//               className="action-button end-game-button"
//               type="button"
//               onClick={onEndGame}
//             >
//               End Game
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CoinGamePage;
