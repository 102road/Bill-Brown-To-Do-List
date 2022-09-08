import React from "react";
import { Link } from "react-router-dom";

export default function SignInButton() {
  return (
    <>
      <div className="container">
        <Link to="/Login">
          <button className="button">Login</button>
        </Link>
      </div>
    </>
  );
}
