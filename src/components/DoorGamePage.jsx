import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addGameToHistory, updateBalance } from '../redux/gameHistorySlice';
import Modal from './Modal';
import '../sass/components/DoorGamePage.scss';

function DoorGamePage() {
  const balance = useSelector((state) => state.balance.currentBalance);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedDoor, setSelectedDoor] = useState(null);
  const [result, setResult] = useState(null);
  const [winningDoor, setWinningDoor] = useState(null);
  const [updatedBalance, setUpdatedBalance] = useState(balance);  
  const [showDescription, setShowDescription] = useState(false);

  const doors = ['A', 'B', 'C'];

  const onDoorSelected = (door) => {
    setSelectedDoor(door);
  };

  const onPlay = () => {
    const winningDoor = doors[Math.floor(Math.random() * doors.length)];
    const remainingDoors = doors.filter((door) => door !== selectedDoor && door !== winningDoor);
    setWinningDoor(winningDoor);
    const betAmount = balance * 0.05;
    if (selectedDoor === winningDoor) {
      dispatch(updateBalance(balance + betAmount * 3));
      dispatch(addGameToHistory({ game: 'Door', result: 'win' }));
      setResult('win');
    } else {
      dispatch(updateBalance(balance - betAmount));
      dispatch(addGameToHistory({ game: 'Door', result: 'lose' }));
      setResult('lose');
    }
    const newBalance = selectedDoor === selectedDoor ? updatedBalance + betAmount * 2 : updatedBalance - betAmount;
    if (newBalance <= 0) {
      navigate('/try-again');
    } else if (newBalance >= balance * 2) {
      navigate('/winner');
    }
    setUpdatedBalance(newBalance);
  };  

  const onTryAgain = () => {
    setSelectedDoor(null);
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
    <div className='door-game-page'>
      <h2>Door Game</h2>
      <p className='balance'>Current balance: {updatedBalance.toFixed(2)}</p>
      <button className='btn-color description-button ' onClick={handleShowDescription}>Show Game Description</button>
<Modal isOpen={showDescription} handleClose={handleCloseDescription} className="modal-overlay">
  <div>
    <p>
    Every time you click on one of the doors, 5% of your initial deposit is deducted from your balance. The program generates a random value from 1 to 3, if your choice matches the generated value, you triple your bet, otherwise you lose the deducted amount from your balance.
    </p>
  </div>
</Modal>
      {result === null ? (
        <div className='door-game-container'>
          <p>Select a door:</p>
          <div className='door-buttons'>
            {doors.map((door) => (
              <button 
                key={door} 
                className={`door ${selectedDoor === door ? 'selected' : ''}`}
                type="button" 
                onClick={() => onDoorSelected(door)} 
                disabled={selectedDoor}>
                {door}
              </button>
            ))}
          </div>
          <br />
          <button type="button" onClick={onPlay} disabled={!selectedDoor}>
            Play
          </button>
          <div className='link-buttons'>
            <Link className='btn-color' to='/add-funds'>Add Funds</Link>
            <Link className='btn-color' to='/'>Log Out</Link>
          </div>
        </div>)
      : (
        <div>
          <p className="text-result">{`The winning door was ${winningDoor}. You ${result}!`}</p>
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
export default DoorGamePage;