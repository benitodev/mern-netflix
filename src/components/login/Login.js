import React, { useContext, useState } from "react";
import login from "../../context/apiCalls";
import AuthContext from "../../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  return (
    <section className="login">
      <div className="top">
        <div className="Login-wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt="netflix-logo"
            style={{ backgroundColor: "transparent" }}
            className="logo"
          />
        </div>
      </div>
      <div className="login-container">
        <form className="login-form ">
          <h1>Sign in</h1>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{ marginBottom: "29px" }}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login-button"
            onClick={handleLogin}
            disabled={isFetching}
          >
            Sign in
          </button>
          <div className="check">
            <article className="check-article">
              <input
                type="checkbox"
                name="my-checkbox"
                style={{ width: "15px", margin: "0 6px 0 0" }}
              />
              <label htmlFor="my-checkbox">Rembember me</label>
            </article>

            <span>need help?</span>
          </div>

          <div className="login-facebook">
            <img
              src="https://www.freepnglogos.com/uploads/facebook-logo-13.png"
              alt="facebook"
            />
            <span>log in with facebook</span>
          </div>

          <span style={{ color: "rgba(155, 155, 155, 0.829)" }}>
            New to netflix?
          </span>
          <b>Sing up now.</b>

          <div className="captcha">
            <span>
              This page is protected to Google reCAPTCHA to comprobate you are
              not a robot.{" "}
              <b style={{ color: "rgba(10,80, 170, 1)" }}>More info</b>
            </span>
          </div>
        </form>
        <hr />
      </div>
      <div className="login-footer">
        <h3>Questions? Call at 0-800-776-5463</h3>
        <div>
          <article>
            <h5>Frequently questions</h5>
            <h5>terms of use</h5>
            <h5>Cookie preferences</h5>
          </article>
          <article>
            <h5>Help center</h5>
            <h5>Privacity</h5>
            <h5>Corporative information</h5>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Login;
