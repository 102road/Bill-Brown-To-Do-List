import React, { useState } from "react";

import SignUpModal from "../modals/signUp";

export default function SignUpButton() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="container">
        <button className="button" onClick={() => setShow(true)}>
          Register
        </button>
        {show && <SignUpModal setShow={setShow} />}
      </div>
    </>
  );
}
