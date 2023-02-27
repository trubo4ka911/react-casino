import { useSelector } from 'react-redux';

function Balance() {
  const balance = useSelector((state) => state.balance);

  return <div>Balance: {balance}</div>;
}

export default Balance;
