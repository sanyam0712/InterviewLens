import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../app/authSlice.js";
import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Login Submit
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch(
        "https://interview-lens.vercel.app/api/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(login({ token: data.token, user: data.user }));
        alert("Login successful!");
        navigate("/"); 
      } else {
        setErrorMessage(data.message || "Something went wrong!");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };

  // Handle Signup Submit
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const jobProfile = event.target.jobProfile.value;

    try {
      const response = await fetch(
        "https://interview-lens.vercel.app/api/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, jobProfile }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
        setIsLogin(true); // Switch to login form
      } else {
        setErrorMessage(data.message || "Something went wrong!");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-heading">{isLogin ? "Login" : "Signup"}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <label className="auth-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="auth-input"
            />
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="auth-input"
            />
            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="auth-form">
            <label className="auth-label">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="auth-input"
            />
            <label className="auth-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="auth-input"
            />
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="auth-input"
            />
            <label className="auth-label">Job Profile</label>
            <input
              type="text"
              name="jobProfile"
              placeholder="Enter your job profile"
              required
              className="auth-input"
            />
            <button type="submit" className="auth-button">
              Signup
            </button>
          </form>
        )}
        <p className="auth-paragraph">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a
            href="#"
            onClick={() => setIsLogin(!isLogin)}
            className="auth-link"
          >
            {isLogin ? "Sign up here" : "Login here"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;