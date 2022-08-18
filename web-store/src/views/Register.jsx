import axios from 'axios';
import { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  function handleRegister(evt) {
    evt.preventDefault();
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }
    axios
      .post('http://localhost:3000/register', {
        name,
        lastname,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
      });
    navigate('/login');
  }

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type='text'
          placeholder='Name'
          required
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
        <input
          type='text'
          placeholder='Lastname'
          required
          value={lastname}
          onChange={(evt) => setLastname(evt.target.value)}
        />
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
        <input
          type='password'
          placeholder='Confirm password'
          required
          value={confirmPassword}
          onChange={(evt) => setConfirmPassword(evt.target.value)}
        />
        <button type='submit' onClick={handleRegister}>
          Send
        </button>
      </form>
    </div>
  );
}
