import React, { useState } from "react";

import "../../../components/buttons/button.scss";

import Plus from "../../../assets/icons/plus.svg";
import AddNewTaskModal from "../modals/addNewTaskModal";

export default function AddNewTask({ reload, setReload }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <button className="button" onClick={() => setShow(!show)}>
        <img className="plus" src={Plus} alt="plus" />
      </button>
      {show && (
        <AddNewTaskModal
          setShow={setShow}
          reload={reload}
          setReload={setReload}
        />
      )}
    </>
  );
}
