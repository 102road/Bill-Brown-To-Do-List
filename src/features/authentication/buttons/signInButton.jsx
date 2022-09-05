import React, { useState } from "react";

import SignInModal from "../modals/signIn";

export default function SignInButton() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="container">
        <button className="button" onClick={() => setShow(true)}>
          Login
        </button>
        {show && <SignInModal setShow={setShow} />}
      </div>
    </>
  );
}
