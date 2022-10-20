import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../apis/database";

import "./button.scss";

import Delete from "../../assets/icons/trash.svg";

export default function deleteButton({ type, title, id }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
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
      setSuccess(true);
    } catch (err) {
      if (err.request.status === 400) setError(true);
      setErrorMessage(`${type} Could Not Be Deleted At This Time.`);
      if (err.request.status === 404) setError(true);
      setErrorMessage(`Server Is Not Responding At This Time.`);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteData();
  };

  return (
    <>
      <button className="icon" onClick={handleDelete}>
        <img className="icon__delete" src={Delete} />
      </button>
      {error && (
        <article className="success">
          <button className="success__back" onClick={() => setError(false)}>
            X
          </button>
          <p className="success__message">{errorMessage}</p>
        </article>
      )}
      {success && (
        <article className="success">
          <button className="success__back">{type}</button>
          <p className="success__message">{`${type} Has Been Deleted Successfully.`}</p>
        </article>
      )}
    </>
  );
}
