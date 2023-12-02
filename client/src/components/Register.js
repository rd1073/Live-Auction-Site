import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import axios from "axios";


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();


  const handleRegister = async () => {
    if (!username || !password ) {
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
        "http://localhost:4000/api/user/signup",
        {
          username,
          
          password,
          
        },
        config
      );
      console.log(data);
      console.log("regitration succesful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      
      navigate('/login');
    } catch (error) {
      console.log(error);
     }




  };



  return (
    <div>
      <h2>Register</h2>
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
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  )
}

export default Register;
