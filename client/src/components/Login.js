import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'; 
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
 
 import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
      if (!username || !password) {
        console.log("please fill all the fields");
         return;
      }
  
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:4000/api/user/login",
          {
          
            username,
            password,
            
          },
          config
        );
        console.log(data);
        console.log("login succesfull");
        sessionStorage.setItem("userInfo", JSON.stringify(data));
        
        navigate('/products');
      } catch (error) {
        console.log(error);
       }

    };


  return (
    /*
    <div>
    <h2>Login</h2>
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </form>
    <p>
      Not a user? <Link to="/register">Register here</Link>.
    </p>
  </div>*/
  <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form"  noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           />
           
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
             
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    
  )
}

export default Login
