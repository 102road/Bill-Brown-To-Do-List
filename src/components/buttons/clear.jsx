import React from "react";

import "./button.scss";

export default function clear({ handleClear }) {
  return (
    <>
      <button className="button" onClick={handleClear}>
        Clear
      </button>
    </>
  );
}
