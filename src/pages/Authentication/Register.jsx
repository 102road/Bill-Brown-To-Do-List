import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactIsCapsLockActive from "@matsun/reactiscapslockactive";

import "../../features/main/authentication.scss";
import axios from '../../apis/users';

import Clear from "../../components/buttons/clear";
import Submit from "../../components/buttons/submit";

const USER_REGEX = /^[A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#£$%]).{8,24}$/;

export default function signUp() {
  // State hooks
  const userRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [showUsernameMessage, setShowUsernameMessage] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [showPasswordMessage, setShowPasswordMessage] = useState(false);

  const [matchPassword, setMatchedPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [showMatchPasswordMessage, setShowMatchPasswordMessage] =
    useState(false);
  const [showMatch, setShowMatch] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [errMessage, setErrMessage] = useState("");

  // UseEffects hooks
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password, matchPassword]);

  //Axios function

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    const v3 = password === matchPassword;
    if (!v1) {
      setValidUsername(USER_REGEX.test(username));
      setShowUsernameMessage(true);
      return;
    }
    if (!v2) {
      setValidPassword(PWD_REGEX.test(password));
      setShowPasswordMessage(true);
      return;
    }
    if (!v3) {
      setValidMatch(password === matchPassword);
      setShowMatchPasswordMessage(true);
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post('/signup', {
        username: username,
        password: password,
      });
      sessionStorage.setItem("token", res.data.authToken);
      setSuccess(true);
      setIsLoading(false);
    } catch (err) {
      if (err.request.status === 403) {
        console.log("Hello");
        setErrMessage("Username is taken already");
        setError(true);
        setIsLoading(false);
        return;
      }
      if (err.request.status === 404) {
        setErrMessage(
          "Server is not responding at this time, please try again later."
        );
        setError(true);
        setIsLoading(false);
        return;
      }
      if (err.request.status === 500) {
        setErrMessage("Registration failed, please try again later");
        setError(true);
        setIsLoading(false);
        return;
      }
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
      {/* initial register form */}
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
                ref={userRef}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              {!validUsername && showUsernameMessage && (
                <div className="pop-up">
                  <p className="pop-up__message">
                    Username must be between 3 and 23 characters long and only
                    contain letters and numbers.
                  </p>
                </div>
              )}
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
              {!validPassword && showPasswordMessage && (
                <div className="pop-up">
                  <p className="pop-up__message">
                    Password must contain atleast one of the following:
                    Uppercase letter, lowercase letter, number and of these
                    symbols <span>!@#£$%. </span>Must be between 8 and 24
                    characters long.
                  </p>
                </div>
              )}
            </div>
            <div className="divider">
              <label className="label">Confirm Password:</label>
              <div className="password-container">
                <input
                  className="input password-input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={matchPassword}
                  onChange={(e) => {
                    setMatchedPassword(e.target.value);
                  }}
                ></input>
                <button className="show-password" onClick={toggleShowPassword}>
                  Show
                </button>
              </div>
              {!validMatch && showMatchPasswordMessage && (
                <div className="pop-up">
                  <p className="pop-up__message">Passwords must match</p>
                </div>
              )}
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
      {/* loading screen */}
      {isLoading && (
        <article className="standby">
          <p className="standby-message">Loading...</p>
        </article>
      )}
      {/* error response */}
      {!isLoading && !success && error && (
        <article className="standby">
          <p className="standby-message">Error!</p>
          <p className="standby-message">{errMessage}</p>
        </article>
      )}
      {/* successfull register screen */}
      {!isLoading && success && (
        <article className="standby">
          <p className="standby-message">Registration Successfull!</p>
          <Link to="/Projects">
            <button className="button">Projects</button>
          </Link>
        </article>
      )}
    </>
  );
}
