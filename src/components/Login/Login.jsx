import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("email" + " " + email, "password" + " " + password);
  };
  
  return (
    <div className="login-container">
      <h1> Login </h1>
      <form onSubmit={handleLoginFormSubmit}>
        <label>Email:</label>
        <input type="email" name="email" />
        <br />
        <label>Password:</label>
        <input type="password" name="password" />
        <br />
        <button type="submit">Login</button>
      </form>
      <p style={{ textAlign: "center" }}>
        Create new account
        <Link to="/signup" style={{ color: "#254255", fontWeight: "bold" }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
