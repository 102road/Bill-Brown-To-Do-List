import React from "react";

import "./button.scss";

export default function submit({ handleSubmit }) {
  return (
    <>
      <button className="button" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
