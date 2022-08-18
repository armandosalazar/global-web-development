import styles from './CartListItem.module.css';

export default function CartListItem({ product }) {
  return (
    <div className={styles.container}>
      <div>
        <h2>{product?.title}</h2>
      </div>
      <div>
        <p style={{ textAlign: 'right' }}>{product?.description}</p>
        <button style={{ width: 'fit-content' }}>Delete</button>
      </div>
    </div>
  );
}
