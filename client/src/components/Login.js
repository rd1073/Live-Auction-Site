import React from 'react'

const Login = () => {
    const [userName, setUserName] = useState('');

  return (
    <div>
      <form className="home__form" onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your username</label>
        <input
          type="text"
          name="username"
          className="home__input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          minLength={6}
        />
        <button className="home__cta">SIGN IN</button>
      </form>
    </div>
    
  )
}

export default Login
