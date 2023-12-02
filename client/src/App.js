 import AddProduct from './components/AddProduct';
import BidProduct from './components/BidProduct';
import Products from './components/Products';
import Nav from './components/Nav';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');


function App() {
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;