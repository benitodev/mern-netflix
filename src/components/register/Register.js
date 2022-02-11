import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const emailRef = useRef();
  const handleStart = (e) => {
    setEmail(emailRef.current.value);
  };

  const handleChange = (e) => {
    if (e.target.matches("input[name='username']")) {
      setUsername(e.target.value);
    }
    if (e.target.matches("input[name='password']")) {
      setPassword(e.target.value);
    }
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://immense-chamber-40390.herokuapp.com/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="register">
      <div className="top">
        <div className="register-wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="netflix-logo"
            style={{ backgroundColor: "transparent" }}
            className="logo"
          />
          <Link to="../login">
            <button className="sign-in">Sign in</button>
          </Link>
          {/* <Link to="login">Sign in</Link> */}
        </div>
      </div>
      <div className="register-container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watcg anywhere. cancel anytime</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="register-input">
            <input
              type="email"
              name="email"
              placeholder="email address"
              onChange={handleChange}
              ref={emailRef}
            />
            <button className="register-button" onClick={handleStart}>
              Get started
            </button>
          </div>
        ) : (
          <form
            id="register-input"
            className="register-input"
            style={{
              display: "grid",
              gridTemplateColumns: "1",
              justifyContent: "normal",
              width: "100%",
              maxWidth: "800px",
              height: "140px",
            }}
          >
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password address"
              onChange={handleChange}
            />
            <button className="register-button" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Register;
