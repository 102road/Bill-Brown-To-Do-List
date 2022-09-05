import React from "react";
import "../features/main/main.scss";

import SignUpButton from "../features/authentication/buttons/signUpButton";
import SignInButton from "../features/authentication/buttons/signInButton";

export default function Home() {
  return (
    <>
      <section className="home">
        <div className="home__container">
          <h1 className="home__title">Welcome to Project Pursuit!</h1>
        </div>
        <div className="home__buttons">
          <SignInButton />
          <SignUpButton />
        </div>
      </section>
    </>
  );
}
