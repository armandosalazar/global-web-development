import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './Admin.module.css';

export default function Admin() {
  const [products, setProducts] = useState();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/products').then((res) => {
      setProducts(res.data);
    });
  }, [update, title, price, description, thumbnail, id]);

  function handleEdit(evt, product) {
    setUpdate(!update);

    setTitle(product.title);
    setPrice(product.price);
    setDescription(product.description);
    setThumbnail(product.thumbnail);
    setId(product.id);
  }
  function handleDelete(evt, id) {
    axios.delete(`http://localhost:3000/products/${id}`).then((res) => {
      setProducts(products.filter((product) => product.id !== id));
    });

  }
  function handleUpdate(evt) {
    evt.preventDefault();
    axios.put(`http://localhost:3000/products/${id}`, {
      title,
      description,
      price,
      thumbnail
    }).then((_res) => {
      setUpdate(!update);
      alert('Product updated');
    });
    setTitle('');
    setDescription('');
    setPrice(''),
    setThumbnail('')
  }
  function handleAdd(evt) {
    evt.preventDefault();
    axios.post('http://localhost:3000/products', {
      title,
      description,
      price,
      thumbnail
    }).then((_res) => {
      alert('Product added');
    });
    setTitle('');
    setDescription('');
    setPrice(''),
    setThumbnail('')
  }

  return (
    <div className={styles.container}>
      <h1>Admin</h1>
      <div style={{ display: 'flex' }}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Thumbnail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <strong>{product.title}</strong>
                  </td>
                  <td>{product.description}</td>
                  <td>
                    <b>${product.price}</b>
                  </td>
                  <td>{product.thumbnail}</td>
                  <td>
                    <button onClick={(evt) => handleEdit(evt, product)}>
                      Edit
                    </button>
                    <button onClick={evt => handleDelete(evt, product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <form style={{ padding: '20px' }}>
          <input
            type='text'
            placeholder='Title'
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
          <input
            type='text'
            placeholder='Description'
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          />
          <input
            type='number'
            placeholder='Price'
            value={price}
            onChange={(evt) => setPrice(evt.target.value)}
          />
          <input
            type='text'
            placeholder='Thumbnail'
            value={thumbnail}
            onChange={(evt) => setThumbnail(evt.target.value)}
          />
          <button onClick={update ? handleUpdate : handleAdd}>
            {update ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
}
