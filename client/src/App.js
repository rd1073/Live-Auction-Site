 import AddProduct from './components/AddProduct';
import BidProduct from './components/BidProduct';
import Products from './components/Products';
import Nav from './components/Nav';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import React, { useState, useEffect } from 'react';

import socketIO from 'socket.io-client';
import Profile from './components/Profile';
const socket = socketIO.connect('http://localhost:4000');


function App() {
  useEffect(() => {
    console.log('Socket connected:', socket.connected);
    
  }, [socket]);
  return (
    <Router>
      <div>
        <Nav socket={socket} />
         

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

 
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/add"
            element={<AddProduct socket={socket} />}
          />

          
          <Route
            path="/products/bid/:title/:price"
            element={<BidProduct socket={socket} />}
          />
          <Route
            path="/profile/:username"
            element={<Profile socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;