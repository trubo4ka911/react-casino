import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDeposit } from '../redux/balanceSlice';
import "../sass/components/LoginPage.scss";

function LoginPage() {
  const [formData, setFormData] = useState({ name: '', deposit: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const onDepositChange = (e) => {
    setFormData({ ...formData, deposit: parseFloat(e.target.value) });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, deposit } = formData;
    if (name && deposit >= 1) {
      dispatch(setDeposit({ name: name, deposit: deposit }));
      navigate('/home-page');
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome to the Game Platform!</h1>
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input type="text" value={formData.name} onChange={onNameChange} />
        </label>
        <br />
        <label>
          Deposit:
          <input type="number" value={formData.deposit} onChange={onDepositChange} />
        </label>
        <br />
        <button type="submit" disabled={!formData.name || !formData.deposit}>
          Start
        </button>
      </form>
    </div>
  );
}

export default LoginPage;