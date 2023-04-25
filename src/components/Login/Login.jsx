import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const [showPass, setShowPass] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lodging, setLodging] = useState(true);

  const { loginUer } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log("email" + " " + email, "password" + " " + password);
    e.target.reset("");

    loginUer(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleShowPassword = () => {
    setShowPass(showPass === "password" ? "text" : "password");
  };

  return (
    <div className="login-container">
      <h1> Login </h1>
      <form onSubmit={handleLoginFormSubmit}>
        <label>Email:</label>
        <input type="email" name="email" />
        <br />
        <label>Password:</label>
        <input type={showPass} name="password" />
        <span onClick={handleShowPassword} style={{ position: "relative" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{
              width: "20px",
              position: "absolute",
              top: "-40px",
              left: "360px",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </span>
        <br />
        <button type="submit">Login</button>
      </form>
      <p style={{ textAlign: "center" }}>
        Create new account{" "}
        <Link to="/signup" style={{ color: "#254255", fontWeight: "bold" }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
