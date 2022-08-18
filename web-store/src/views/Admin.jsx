import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './Admin.module.css';

export default function Admin() {
  const [products, setProducts] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/products').then((res) => {
      setProducts(res.data);
    });
  }, []);

  function handleEdit(evt, product) {
    setUpdate(!update);

    setTitle(product.title);
    setPrice(product.price);
    setDescription(product.description);
    setThumbnail(product.thumbnail);
  }
  function handleDelete() {}
  function handleUpdate(id) {
    // axios.put(`http://localhost:3000/products/${id}`).then((res) => {
    //   setUpdate(!update);
    //   alert('Product deleted', res);
    // });
    // alert('Product updated');
  }
  function handleAdd() {}

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
                  <td style={{ display: 'flex' }}>
                    <button onClick={(evt) => handleEdit(evt, product)}>
                      Edit
                    </button>
                    <button onClick={handleDelete}>Delete</button>
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
