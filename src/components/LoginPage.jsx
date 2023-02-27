import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateBalance } from '../redux';

function LoginPage() {
  const [name, setName] = useState('');
  const [deposit, setDeposit] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDepositChange = (e) => {
    setDeposit(parseInt(e.target.value, 10));
  };

  const onSubmit = () => {
    dispatch(updateBalance(deposit));
    history.push('/home');
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
