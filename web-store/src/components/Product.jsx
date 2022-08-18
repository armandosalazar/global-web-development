// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { UilPlusCircle } from '@iconscout/react-unicons';
import axios from 'axios';
import styles from './Product.module.css';

export default function Product({ product }) {
  const id = JSON.parse(localStorage.getItem('payload'))?.id;
  async function handleAddToCart() {
    const res = await axios.get(`http://localhost:3000/cart/${id}`);
    const data = JSON.parse(res.data);
    data.push(product?.id);
    console.log(data);
    await axios.post('http://localhost:3000/cart', {
      id,
      cart: JSON.stringify(data),
    });
    console.log(data, id);
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>{product?.title}</h2>
        <p>{product?.description}</p>
        <p className={styles.price}>${product?.price}</p>
        <img src={product?.thumbnail} />
        <button onClick={handleAddToCart}>
          <UilPlusCircle />
          <span style={{ marginLeft: '10px' }}>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
