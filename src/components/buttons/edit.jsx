import React, { useState } from "react";

import "./button.scss";

import Edit from "../../assets/icons/edit.svg";
import EditModal from "../modals/editModal";

export default function edit({ type, title, description, reload, setReload }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="icon" onClick={() => setShow(true)}>
        <img className="icon__edit" src={Edit} />
      </button>

      {show && (
        <EditModal
          type={type}
          title={title}
          description={description}
          setShow={setShow}
          reload={reload}
          setReload={setReload}
        />
      )}
    </>
  );
}
