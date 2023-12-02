import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation





const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

    };


  return (
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
  </div>
    
  )
}

export default Login
