import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartListItem from './CartListItem';
import Load from './Load';

export default function CartList() {
  const [list, setList] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('payload'))?.id;
    getData(id);
  }, []);

  async function getData(id) {
    await axios.get(`http://localhost:3000/cart/${id}`).then((res) => {
      setList(JSON.parse(res.data));
    });

    await axios.get('http://localhost:3000/products').then((res) => {
      setProducts(res.data);
    });
  }

  if (!list && !products) {
    return <Load />;
  }

  return (
    <>
      {products?.map((product) => {
        if (list?.includes(product?.id)) {
          return <CartListItem product={product} key={product?.id} />;
        }
      })}
    </>
  );
}
