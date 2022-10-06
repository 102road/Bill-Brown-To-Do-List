import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../features/main/authentication.scss";

import Clear from "../../components/buttons/clear";
import Submit from "../../components/buttons/submit";

export default function Login() {
  // Declaration of states

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleClear = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put(url, { login: login, password: password });
      if (res.status === 201) {
        sessionStorage.setItem("token", res.data.authToken);
        setIsLoading(false);
        setSuccess(true);
        return;
      }
      if (res.status === 401) {
        setIsLoading(false);
        setErrMessage("Username Not Found");
        setError(true);
        return;
      }
      if (res.status === 404) {
        setIsLoading(false);
        setErrMessage("Server Not Responding At This Time");
        setError(true);
        return;
      }
      if (res.status === 501) {
        setIsLoading(false);
        setErrMessage("Incorrect Password");
        setError(true);
        return;
      }
    } catch (err) {
      setErrMessage("Login Failed");
    }
  };

  return (
    <>
      {/*form to fill in login details*/}
      {!isLoading && (
        <div className="login">
          <form className="form">
            <div className="username">
              <label className="label">Username:</label>
              <input className="input"></input>
            </div>
            <div className="password">
              <label className="label">Password:</label>
              <div className="password-container">
                <input className="input password-input"></input>
                <button className="show-password">O</button>
              </div>
            </div>
          </form>
          <div className="buttons">
            <Clear handleClear={handleClear} />
            <Submit handleSubmit={handleSubmit} />
          </div>
          <div className="display-message">
            <p>{errMessage} Caps lock turned on</p>
          </div>
        </div>
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
          <button className="success-button">Projects</button>
        </article>
      )}
    </>
  );
}
