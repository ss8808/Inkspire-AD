import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', credentials);
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="logo">📖 Inkspire</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label>Email or Username</label>
        <input
          type="text"
          name="usernameOrEmail"
          value={credentials.usernameOrEmail}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit">Login</button>

        <div className="roles">
          <span>Member</span>
          <span>Staff</span>
          <span>Admin</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
