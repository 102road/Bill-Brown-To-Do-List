import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../features/main/modals/authentication.scss";

import Clear from "../../../components/buttons/clear";
import Submit from "../../../components/buttons/submit";

import axios from "../../apis/users";
import useAxiosFunction from "../../hooks/useAxiosFunction";

const USER_REGEX = /^[A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#£$%]).{8,24}$/;

export default function signUp() {
  // State hooks
  const userRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [matchPassword, setMatchedPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [showMatch, setShowMatch] = useState(false);

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [message, setMessage] = useState("");

  const [user, errorMessage, error, isLoading, axiosFetch] = useAxiosFunction();

  // UseEffects hooks
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    sessionStorage.setItem("token", user.authToken);
  }, [user]);

  //Axios function

  const handleSubmit = (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setValidMatch(false);
      return;
    }
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: "/signup",
      requestConfig: { username: username, password: password },
    });
    if (error) {
      setMessage(errorMessage);
      setFail(true);
    }
    if (!error) {
      setSuccess(true);
    }
  };

  //Utility functions

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
    setShowMatch(!showMatch);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setMatchedPassword("");
  };

  return (
    <>
      {isLoading && <p className="sign-in__pop-up">Loading ...</p>}
      {!isLoading && success && (
        <section className="sign-in__pop-up">
          <p className="sign-in__title">New Account Created!</p>
          <Link to="/Projects">Go To Projects</Link>
        </section>
      )}
      {!isLoading && fail && (
        <section className="sign-in__message">
          <p className="sign-in__title">Account couldn't be created</p>
          <p className="sign-in__title">{message}</p>
          <p className="sign-in__title">Refresh the page to try again</p>
        </section>
      )}
      {!isLoading && !success && (
        <section className="sign-in">
          <div className="sign-in__container">
            <div className="sign-in__header">
              <h1 className="sign-in__title">Register</h1>
            </div>
            {error && <p className="sign-in__message">{error}</p>}{" "}
            <form className="sign-in__form" onSubmit={handleSubmit}>
              <label className="sign-in__label">Username:</label>
              <input
                className="sign-in__username"
                name="username"
                type="text"
                value={username}
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <div className="message-container--username">
                {!validUsername && username && (
                  <p className="invalid-message">
                    Username must be atleast 3 characters long and can only use
                    numbers and letters
                  </p>
                )}
              </div>
              <label className="sign-in__label">Password:</label>
              <div className="sign-in__password">
                <input
                  className="sign-in__input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button
                  className="show-password-button"
                  onClick={toggleShowPassword}
                >
                  O
                </button>
              </div>
              <div className="message-container--password">
                {!validPassword && password && (
                  <p className="invalid-message">
                    Password must be atleast 8 characters long, less than 24 and
                    contain atleast one number, a capital letter and one of
                    these characters: <span>! £ $ % # @</span>
                  </p>
                )}
              </div>
              <label className="sign-in__label">Confirm:</label>
              <div className="sign-in__password">
                <input
                  className="sign-in__input"
                  name="matched-password"
                  type={showMatch ? "text" : "password"}
                  value={matchPassword}
                  onChange={(e) => setMatchedPassword(e.target.value)}
                ></input>
                <button
                  className="show-password-button"
                  onClick={toggleShowPassword}
                >
                  O
                </button>
              </div>
              <div className="message-container--confirm">
                {!validMatch && (
                  <p className="invalid-message">Passwords must match</p>
                )}
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
