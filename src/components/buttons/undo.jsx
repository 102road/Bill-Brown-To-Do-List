import React from "react";

import "./button.scss";

export default function undo({ undo }) {
  return (
    <>
      <button className="button" onClick={undo}>
        Undo
      </button>
    </>
  );
}
