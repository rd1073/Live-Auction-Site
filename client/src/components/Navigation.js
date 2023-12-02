import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userInfo');

    // Redirect to the login page after logout
    navigate('/login');

  };
 

  return (
    <div>
      <Stack direction="row" spacing={3}>
      <Link to="/products">
      <Button>My Products</Button></Link>
      <Link to="/products">
      <Button >Products</Button></Link>
      <Link to="/products">
      <Button href="#text-buttons">Profile</Button></Link>
      
      <Button onClick={handleLogout}>Logout</Button>

    </Stack>
       
    </div>
  )
}

export default Navigation
