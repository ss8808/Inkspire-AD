import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('https://localhost:7188/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        twoFactorCode: '',
        twoFactorRecoveryCode: ''
      })
    });

    const data = await response.json();
    console.log("Raw login response:", data);

    if (response.ok && data?.accessToken) {
      const token = data.accessToken;
      sessionStorage.setItem('authToken', token);

      try {
        const profileRes = await fetch('https://localhost:7188/api/User/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (profileRes.ok) {
          const profile = await profileRes.json();
          const userId = profile.userId;
          sessionStorage.setItem('userId', userId); // ✅ Store userId

          toast.success('Login Successful!');

          // ✅ Redirect based on userId
          if (Number(userId) === 1) {
            navigate('/admin');
          } else {
            navigate('/');
          }

        } else {
          console.warn("Failed to get user profile.");
          toast.error("Login succeeded but failed to fetch user data.");
        }
      } catch (fetchErr) {
        console.error("Profile fetch error:", fetchErr);
        toast.error("Unable to fetch user info.");
      }
    } else {
      toast.error(data.message || "Login failed.");
    }

  } catch (err) {
    console.error("Login error:", err);
    toast.error("Network error. Please try again.");
  }
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

        <label>Email</label>
        <input
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit">Login</button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Login;