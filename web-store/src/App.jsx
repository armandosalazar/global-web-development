import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Header from './components/Header';
import Products from './views/Products';
import Sales from './views/Sales';
import Users from './views/Users';
import Register from './views/Register';
import Cart from './views/Cart';
import Admin from './views/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route path='' element={<Home />} />
          <Route path='admin' element={<Admin />} />
          <Route path='products' element={<Products />} />
          <Route path='cart' element={<Cart />} />
          <Route path='sales' element={<Sales />} />
          <Route path='users' element={<Users />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
