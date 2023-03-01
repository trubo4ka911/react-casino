import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateBalance } from '../redux/gameHistorySlice';

function LoginPage() {
  const [name, setName] = useState('');
  const [deposit, setDeposit] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDepositChange = (e) => {
    setDeposit(parseInt(e.target.value, 10));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBalance(deposit));
    navigate('/home');
  };
  

  return (
    <div>
      <h2>Welcome to the Game Platform!</h2>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={onNameChange} />
        </label>
        <br />
        <label>
          Deposit:
          <input type="number" value={deposit} onChange={onDepositChange} />
        </label>
        <br />
        <button type="button" onClick={onSubmit} disabled={!name || deposit < 1}>
          Start
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
