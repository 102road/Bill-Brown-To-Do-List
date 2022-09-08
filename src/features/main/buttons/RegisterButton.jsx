import React from "react";
import { Link } from "react-router-dom";

export default function SignUpButton() {
  return (
    <>
      <div className="container">
        <Link to="/Register">
          <button className="button">Register</button>
        </Link>
      </div>
    </>
  );
}
