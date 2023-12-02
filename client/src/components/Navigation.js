import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const Navigation = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userInfo');

    // Redirect to the login page after logout
    navigate('/login');

  };

  const handleProfile = () => {
    if (userInfo) {
      // Pass the username as a parameter to the profile page
      navigate(`/profile/${userInfo.username}`);
    }
  };
 

  return (
    <div>
      <Stack direction="row" spacing={3}>
      {/*<Link to="/products">
      <Button>My Products</Button></Link>*/}
      <Link to="/products">
      <Button >Products</Button></Link>
      
      <Button href="#text-buttons" onClick={handleProfile}>Profile</Button>
      
      <Button onClick={handleLogout}>Logout</Button>

    </Stack>
       
    </div>
  )
}

export default Navigation
