import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useFetch from './components/useFetch';
import './App.css';

//components
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './components/Home';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import ModalView from './components/ModalView';
import Discounts from './components/Discounts';
import Trending from './components/Trending';
import Hoodies from './components/Hoodies';
import Hats from './components/Hats';
import Tshirts from './components/Tshirts';
import Login from './components/Login';
import Cart from './components/Cart';

function App() {
  const { data, pending, error } = useFetch('http://localhost:8000/products')
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="App">
      <Router>
        <NavBar loggedIn={loggedIn} />
        <Routes>

          <Route path="/" element={<Home data={data} />} />

          <Route path="products">
            <Route path="all" element={<Products data={data} />} />
            <Route path="tshirts" element={<Tshirts />} />
            <Route path="hoodies" element={<Hoodies />} />
            <Route path="hats" element={<Hats />} />
            <Route path="discounts" element={<Discounts />} />
            <Route path="trending" element={<Trending />} />
          </Route>

          <Route path="quick/:id" element={<ModalView />} />
          <Route path="products/:id" element={<ProductDetails />} />

          <Route path="/login" element={!loggedIn ? <Login setLoggedIn={setLoggedIn} /> : <Navigate to="/" />} />
          <Route path="/cart" element={loggedIn ? <Cart setLoggedIn={setLoggedIn} /> : <Navigate to="/login" />} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
