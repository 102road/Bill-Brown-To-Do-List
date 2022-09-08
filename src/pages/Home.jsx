import React from "react";
import "../features/main/main.scss";

import LoginButton from "../features/main/buttons/LoginButton";
import RegisterButton from "../features/main/buttons/RegisterButton";

export default function Home() {
  return (
    <>
      <section className="home">
        <div className="home__container">
          <h1 className="home__title">Welcome to Project Pursuit!</h1>
        </div>
        <div className="home__buttons">
          <LoginButton />
          <RegisterButton />
        </div>
      </section>
    </>
  );
}
