import React, { useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import ReactIsCapsLockActive from "@matsun/reactiscapslockactive";

import "../../features/main/authentication.scss";

import Clear from "../../components/buttons/clear";
import Submit from "../../components/buttons/submit";

const url = "http://localhost:4000/users/login";

export default function Login() {
  // Declaration of states

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [errMessage, setErrMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(url, { username: username, password: password });
        sessionStorage.setItem("token", res.data.authToken);
        setIsLoading(false);
        setSuccess(true);
    } catch (err) {
      if (err.request.status === 401) {
        setErrMessage("Username Is Not Recognised");
        setError(true);
        setIsLoading(false);
        return;
      }
      if (err.request.status === 404) {
        setErrMessage("Server Is Not Responding At This Time");
        setError(true);
        setIsLoading(false);
        return;
      }
      if (err.request.status === 501) {
        setErrMessage("Password Entered Is Incorrect");
        setError(true);
        setIsLoading(false);
        return;
      }
    }
  };

  return (
    <>
      {/*form to fill in username details*/}
      {!isLoading && !success && !error && (
        <section className="login">
          <form className="form">
            <div className="divider">
              <label className="label">Username:</label>
              <input
                className="input"
                name="username"
                type="text"
                value={username}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="divider">
              <label className="label">Password:</label>
              <div className="password-container">
                <input
                  className="input password-input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
                <button className="show-password" onClick={toggleShowPassword}>
                  Show
                </button>
              </div>
            </div>
          </form>
          <div className="buttons">
            <Clear handleClear={handleClear} />
            <Submit handleSubmit={handleSubmit} />
          </div>
          <ReactIsCapsLockActive>
            {(active) => (
              <span className="display-message">
                {active ? "Caps lock is  active" : ""}
              </span>
            )}
          </ReactIsCapsLockActive>
        </section>
      )}

      {/*loading meesage*/}
      {isLoading && (
        <article className="standby">
          <p className="standby-message">Loading...</p>
        </article>
      )}

      {/*error mesage*/}
      {!isLoading && !success && error && (
        <article className="standby">
          <p className="standby-message">Error!</p>
          <p className="standby-message">{errMessage}</p>
        </article>
      )}

      {/*displays success message and allows user to select their projects*/}
      {!isLoading && success && (
        <article className="standby">
          <p className="standby-message">Login Successfull!</p>
          <Link to='/Projects'>
          <button className="button">Projects</button>
          </Link>
        </article>
      )}
    </>
  );
}
