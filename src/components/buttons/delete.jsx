import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../apis/database";

import "./button.scss";

import Delete from "../../assets/icons/trash.svg";

export default function deleteButton({ type, title, id, reload, setReload }) {
  const [show, setShow] = useState();

  const [errorMessage, setErrorMessage] = useState("");

  const { ProjectTitle, ToDoTitle } = useParams();

  const createURL = () => {
    if (type === "Project") return `/${title}/delete`;
    if (type === "ToDo") return `/${ProjectTitle}/${title}/delete`;
    if (type === "Task") return `/${ProjectTitle}/${ToDoTitle}/${id}/delete`;
  };

  const deleteData = async () => {
    const url = createURL();
    try {
      await axios.delete(url);
    } catch (err) {
      if (err.request.status === 400)
        return setErrorMessage(`${type} Could Not Be Deleted At This Time.`);
      if (err.request.status === 404)
        return setErrorMessage(`Server Is Not Responding At This Time.`);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteData();
    setReload(!reload);
  };

  return (
    <>
      <button className="icon" onClick={handleDelete}>
        <img className="icon__delete" src={Delete} />
      </button>
    </>
  );
}
