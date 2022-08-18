const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const axios = require('axios').default;
const db = require('./db');

express()
  .use(cors())
  .use(morgan('dev'))
  .use(express.json())
  .get('/cart/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        console.log(result);
        res.status(200).json(result[0].cart);
      }
    });
  })
  .post('/cart', (req, res) => {
    const { id, cart } = req.body;
    console.log(id, cart);
    db.query(
      'UPDATE users SET cart = ? WHERE id = ?',
      [cart, id],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          res.status(200).json(result);
        }
      }
    );
    // db.query(
    //   'UPDATE users SET cart = ? WHERE id = ?',
    //   [cart, id],
    //   (err, result) => {
    //     if (err) {
    //       res.status(500).json({ error: err });
    //     } else {
    //       res.status(200).json(result);
    //     }
    //   }
    // );
  })
  .post('/register', (req, res) => {
    const { name, lastname, email, password } = req.body;
    console.log(req.body);
    db.query(
      'INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)',
      [name, lastname, email, password],
      (err, result) => {
        if (err) {
          res.json({ error: err });
        } else {
          res.json(result);
        }
      }
    );
  })
  .post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    db.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password],
      (err, result) => {
        if (err) {
          res.json({ error: err });
        } else {
          res.json(result);
        }
      }
    );
  })
  .get('/products', (_req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving products');
      } else {
        res.json(results);
      }
    });
    // axios.get('https://dummyjson.com/products').then((res) => {
    //   console.log(res.data);
    //   res.data.products.map((product) => {
    //     console.log(product);
    //     db.query(
    //       'INSERT INTO products (title, description, price, thumbnail) VALUES (?, ?, ?, ?)',
    //       [
    //         product.title,
    //         product.description,
    //         product.price,
    //         product.thumbnail,
    //       ],
    //       (err, results) => {
    //         if (err) {
    //           console.error(err);
    //         } else {
    //           console.log(results);
    //         }
    //       }
    //     );
    //   });
    // });
    // res.send('Hello World!');
  })
  .post('/products', (req, res) => {
    const { title, description, price, thumbnail } = req.body;
    db.query(
      'INSERT INTO products (title, description, price, thumbnail) VALUES (?, ?, ?, ?)',
      [title, description, price, thumbnail],
      (err, results) => {
        if (err) {
          res.status(500).send('Error saving a new product');
        } else {
          res.json(results);
        }
      }
    );
  })
  .put('/products/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, price, thumbnail } = req.body;
    db.query(
      'UPDATE products SET title = ?, description = ?, price = ?, thumbnail = ? WHERE id = ?',
      [title, description, price, thumbnail, id],
      (err, results) => {
        if (err) {
          res.status(500).send('Error updating a product');
        } else {
          res.json(results);
        }
      }
    );
  })
  .delete('/products/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json(result);
      }
    });
  })
  .listen(3000, () => {
    console.log('Listening on port 3000');
  });
