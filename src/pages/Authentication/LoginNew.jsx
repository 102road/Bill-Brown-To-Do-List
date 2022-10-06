import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../features/authentication.scss";

export default function Login() {
  // Declaration of states

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

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
        <form className="login">
          <div className="username">
            <label className="label"></label>
            <input className="input"></input>
          </div>
          <div className="password">
            <label className="label"></label>
            <input className="input"></input>
            <button className="show-password">O</button>
          </div>
          <p className="message">{message}</p>
        </form>
      )}

      {/*loading meesage*/}
      {isLoading && (
        <article className="standby">
          <p>Loading...</p>
        </article>
      )}

      {/*error mesage*/}
      {!isLoading && !success && error && (
        <article>
          <p>Error!</p>
          <p>{errMessage}</p>
        </article>
      )}

      {/*displays success message and allows user to select their projects*/}
      {!isLoading && success && (
        <article>
          <p>Login Successfull!</p>
          <button>Projects</button>
        </article>
      )}
    </>
  );
}
