import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../apis/database";

import useAxiosFunction from "../../hooks/useAxiosFunction";

import "./button.scss";

import Delete from "../../assets/icons/trash.svg";

export default function deleteButton({ type, title, id, reload, setReload }) {
  const [show, setShow] = useState();

  const { ProjectTitle, ToDoTitle } = useParams();

  const [response, error, isLoading, axiosFetch] = useAxiosFunction();

  const createURL = () => {
    if (type === "Project") return `/${title}/delete`;
    if (type === "ToDo") return `/${ProjectTitle}/${title}/delete`;
    if (type === "Task") return `/${ProjectTitle}/${ToDoTitle}/${id}/delete`;
  };

  const deleteData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: createURL(),
    });
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
