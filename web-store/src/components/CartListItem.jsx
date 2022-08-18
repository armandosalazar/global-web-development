import axios from 'axios';
// import { useEffect } from 'react';
// import { useState } from 'react';
import styles from './CartListItem.module.css';
// import { useNavigate } from 'react-router-dom'

export default function CartListItem({ product, list }) {
  // const [list, setList] = useState([]);
  // const navigate = useNavigate();

  async function handleDelete() {
    const id = JSON.parse(localStorage.getItem('payload'))?.id;
    const newList = list.filter(item => item != product.id);
    // console.log(list);
    // console.log(newList);
    await axios.post('http://localhost:3000/cart', {
      id,
      cart: JSON.stringify(newList),
    });
    window.location.reload();
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>{product?.title}</h2>
      </div>
      <div>
        <p style={{ textAlign: 'right' }}>{product?.description}</p>
        <button style={{ width: 'fit-content' }} onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
