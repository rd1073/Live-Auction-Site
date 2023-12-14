import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Nav = ({ socket }) => {
  const [notification, setNotification] = useState('');
 
  useEffect(() => {
    socket.on('addProductResponse', (data) => {
      console.log('addProductResponse received:', data);

      setNotification(
        `@${data.seller} just added ${data.title} worth $${Number(data.price).toLocaleString()}`
      );
    });

    socket.on('bidProductResponse', (data) => {
      console.log('bidProductResponse received:', data);

      setNotification(
        `@${data.lastbidder} just bid ${data.title} for $${Number(data.userInput).toLocaleString()}`
      );
    });
  }, [socket]);

  

  return (
    <nav className="navbar">
      <div className="header">
        <h2>Live Auction System</h2>
      </div>
      <div>
        
        <Alert severity="info">{notification}</Alert>
        
      </div>

      
        
            
    </nav>
  );
};

export default Nav;