import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [admin, setAdmin] = useState(false);
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const payload = localStorage.getItem('payload');
    const data = JSON.parse(payload);
    if (payload) {
      setAdmin(data.admin);
      setLogged(true);
    }
    // console.log(data);
  }, []);

  function handleLogout() {
    localStorage.removeItem('payload');
    navigate('/products');
    window.location.reload();
  }

  return (
    <>
      <header>
        <Link to=''>
          <h1>WebStore</h1>
        </Link>
        <nav>
          <Link to=''>Home</Link>
          {admin ? (
            <Link to='admin'>Products</Link>
          ) : (
            <Link to='products'>Products</Link>
          )}
          {logged && !admin && <Link to='cart'>Cart</Link>}
          {/* {admin ? <Link to='sales'>Sales</Link> : <></>} */}
          {/* {admin ? <Link to='users'>Users</Link> : <></>} */}
          <Link to='register'>Register</Link>
          {logged ? (
            <Link to='#' onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to='login'>Login</Link>
          )}
        </nav>
      </header>
      <Outlet />
    </>
  );
}
