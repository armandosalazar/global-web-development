import axios from 'axios';
import CartList from '../components/CartList';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Cart() {
  const [list, setList] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('payload'))?.id;
    getData(id);
    console.log(products);
    console.log(list);
  }, []);

  async function getData(id) {
    await axios.get(`http://localhost:3000/cart/${id}`).then((res) => {
      setList(JSON.parse(res.data));
    });

    await axios.get('http://localhost:3000/products').then((res) => {
      setProducts(res.data);
    });
  }


  function handleBuy() {
    // console.log(products)
    const email = JSON.parse(localStorage.getItem('payload'))?.email;
    console.log(email);
    let text = 'Products in buy:\n';
    let total = 0;
    products.map(product => {
      if (list.includes(product.id)) {
        text += `${product.title} - ${product.price}\n`;
        total += Number(product.price);
      }
    });
    text += 'Total: $' + total;
    // axios.post('http://localhost:3000/buy', {text, email}).then((res) => {
    //   console.log(res);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
        Email.send({
        Host: "smtp.gmail.com",
        Username : "webstore21110110@gmail.com",
        Password : "webstore12345",
        To : email,
        From : "webstore21110110@gmail.com",
        Subject : "New order",
        Body : text,
        }).then(
          message => alert("mail sent successfully")
        );
    console.log(text);
    console.log(total);
  }

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
      <button style={{ marginTop: '20px' }} onClick={handleBuy}>Buy</button>
    </div>
  );
}
