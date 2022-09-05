import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../apis/users";

import "./authentication.scss";

import useAxiosFunction from "../../../hooks/useAxiosFunction";

import Clear from "../../../components/buttons/clear";
import Submit from "../../../components/buttons/submit";

export default function signIn({ setShow }) {
  // Hooks
  const userRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [user, error, isLoading, axiosFetch] = useAxiosFunction();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("token", user.authToken);
  }, [user]);

  // Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: "/login",
      requestConfig: {
        username: username,
        password: password,
      },
    });
    setSuccess(true);
  };

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
  };

  return (
    <>
    {isLoading && <p className="sign-in__pop-up">Loading...</p>}
      {!isLoading && success && (
        <section className="sign-in__pop-up">
          <p className="sign-in__pop-up--title">Login Successfull!</p>
          <Link to="/Projects"><span className="link">Projects</span></Link>
        </section>
      )}
      {!isLoading && !success && (
        <section className="sign-in">
          <div className="sign-in__container">
            <button className="sign-in__button" onClick={() => setShow(false)}>
              X
            </button>
            <div className="sign-in__header">
              <h1 className="sign-in__title">Log In</h1>
            </div>
            {error && <p className="sign-in__message">{error}</p>}
            <form className="sign-in__form">
              <label className="sign-in__label">Username:</label>
              <input
                className="sign-in__username"
                name="username"
                type="text"
                value={username}
                ref={userRef}
                autoComplete="off"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              ></input>
              <label className="sign-in__label">Password:</label>
              <div className="sign-in__password">
                <input
                  className="sign-in__input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                ></input>
                <button
                  className="show-password-button"
                  onClick={toggleShowPassword}
                >
                  O
                </button>
              </div>
            </form>
            <div className="sign-in__buttons">
              <Clear handleClear={handleClear} />
              <Submit handleSubmit={handleSubmit} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
