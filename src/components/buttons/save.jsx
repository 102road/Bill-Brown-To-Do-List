import React from "react";

import "./button.scss";

import Save from "../assets/icons/save.svg";

export default function save({ handleSubmit }) {
  return (
    <>
      <button className="icon" onClick={handleSubmit}>
        <img className="icon__save" src={Save} />
      </button>
    </>
  );
}
