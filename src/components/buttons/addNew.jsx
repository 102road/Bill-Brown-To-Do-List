import React, { useState } from "react";

import "./button.scss";

import Plus from "../../assets/icons/plus.svg";

import AddNewModal from "../modals/addNewModal";

export default function addNew({ type }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="button" onClick={() => setShow(true)}>
        <img className="plus" src={Plus} />
      </button>

      {show && (
        <AddNewModal
          type={type}
          show={show}
          setShow={setShow}
        />
      )}
    </>
  );
}
