import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(evt) {
    evt.preventDefault();
    axios
      .post('http://localhost:3000/login', {
        email,
        password,
      })
      .then((res) => {
        const data = res.data[0];
        data.admin = data.admin === 1 ? true : false;
        data.password = null;
        localStorage.setItem('payload', JSON.stringify(data));
        // console.log(data);
      });
    navigate('/products');
    window.location.reload();
  }

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button type='submit' onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
