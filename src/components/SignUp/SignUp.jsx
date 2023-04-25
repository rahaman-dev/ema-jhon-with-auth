import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const SignUp = () => {
  const [showPass, setShowPass] = useState("password");
  const [error, setError] = useState("");
  const { createUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpFormSubmit = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    const password = e.target.password.value;
    const confirm = e.target.confirm.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    e.target.reset("");

    if (password !== confirm) {
      setError("invalid confirm password");
      return;
    }
    if (password.length < 8) {
      setError("password must have an 8 character ");
      return;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setError("password have an uppercase");
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setError("password have an lowercase ");
      return;
    } else if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?])/.test(password)) {
      setError("password have an at least one special character");
      return;
    } else if (!/(?=.*\d)/.test(password)) {
      setError("password have an at least one digit");
      return;
    }
    setError("");

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        // console.log(loggedUser);
      })
      .catch((error) => {
        // console.log(error);
        setError(error.message);
      });
  };

  const handleShowPass = () => {
    setShowPass(showPass === "password" ? "text" : "password");
  };

  return (
    <div className="login-container">
      <h1>Please Create an Account</h1>
      <form onSubmit={handleSignUpFormSubmit}>
        <label>Email:</label>
        <input type="email" name="email" placeholder="Enter Email" required />
        <br />
        <label>Password:</label>

        <input
          type={showPass}
          name="password"
          placeholder="Enter Password"
          required
        />
        <span onClick={handleShowPass} style={{ position: "relative" }}>
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
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          required
        />
        <br />
        <label>First Name:</label>
        <input type="text" name="firstName" placeholder="First Name" required />
        <br />
        <label>Last Name:</label>
        <input type="text" name="lastName" placeholder="Last Name" required />
        <br />
        <button type="submit">Sign Up</button>
        <p style={{ textAlign: "center" }}>
          Already Have an Account?{" "}
          <Link to="/login" style={{ color: "#254255", fontWeight: "bold" }}>
            Login
          </Link>
        </p>
        <p style={{ color: "red" }}>{error}</p>
      </form>
    </div>
  );
};

export default SignUp;
