import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const Navigation = () => {
 

  return (
    <div>
      <Stack direction="row" spacing={3}>
      <Link to="/products">
      <Button>My Products</Button></Link>
      <Link to="/products">
      <Button >Products</Button></Link>
      <Link to="/products">
      <Button href="#text-buttons">Profile</Button></Link>
      <Link to="/products">
<Button href="#text-buttons">Logout</Button></Link>

    </Stack>
       
    </div>
  )
}

export default Navigation
