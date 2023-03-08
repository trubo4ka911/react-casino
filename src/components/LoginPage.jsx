import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBalance } from '../redux/balanceSlice';

import "../sass/components/LoginPage.scss";

function LoginPage() {
  const [name, setName] = useState('');
  const [deposit, setDeposit] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDepositChange = (e) => {
    setDeposit(parseFloat(e.target.value));

  };
console.log(deposit);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setBalance({ name: name, balance: deposit }));
    navigate('/home-page');
  };
  

  return (
    <div className="login-page" >
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
        <button type="submit" disabled={!name || deposit < 1} onClick={onSubmit}>
  Start
</button>
      </form>
    </div>
  );
}

export default LoginPage;
