import { useEffect, useState } from 'react';
import axios from 'axios';
import Load from '../components/Load';
import Product from '../components/Product';
import styles from './Products.module.css';

export default function Products() {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get('http://localhost:3000/products').then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className={data ? styles.container : styles.containerLoad}>
      {data ? (
        data.map((product) => {
          return <Product product={product} key={product?.id} />;
        })
      ) : (
        <Load />
      )}
    </div>
  );
}
