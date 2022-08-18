import CartList from '../components/CartList';

export default function Cart() {
  return (
    <div
      style={{
        width: '90%',
        margin: '50px auto',
        border: '1px solid #646cff',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Cart</h1>
      <CartList />
      <button style={{ marginTop: '20px' }}>Buy</button>
    </div>
  );
}
