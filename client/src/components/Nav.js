import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';


const Nav = ({ socket }) => {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    socket.on('addProductResponse', (data) => {
      setNotification(
        `@${data.seller} just added ${data.title} worth $${Number(
          data.price
        ).toLocaleString()}`
      );
    });
  }, [socket]);


  useEffect(() => {
    socket.on('bidProductResponse', (data) => {
      setNotification(
        `@${data.lastbidder} just bid ${data.title} for $${Number(
          data.userInput
        ).toLocaleString()}`
      );
    });
  }, [socket]);


  return (
    <nav className="navbar">
      <div className="header">
        <h2>Live Auction System</h2>
      </div>

      <div>
        <p style={{ color: 'red' }}>
           <Alert severity="info">{notification}</Alert>
        </p>
      </div>
    </nav>
  );
};

export default Nav;