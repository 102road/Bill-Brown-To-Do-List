import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../apis/database";
import uniqid from "uniqid";

import useAxiosFunction from "../../../hooks/useAxiosFunction";

import Clear from "../../../components/buttons/clear";
import Submit from "../../../components/buttons/submit";

const DESCRIPTION_REGEX = /^[A-z0-9-,.? ! ]{1,250}$/;

export default function addNewTaskModal({ setShow, reload, setReload }) {
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { ProjectTitle, ToDoTitle } = useParams();

  const [response, error, isLoading, axiosFetch] = useAxiosFunction();

  const postData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: `/addTask`,
      requestConfig: {
        projectTitle: ProjectTitle,
        toDoTitle: ToDoTitle,
        id: uniqid(),
        description: description,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = DESCRIPTION_REGEX.test(description);
    if (!validate)
      return setErrorMessage(
        "Description contains invalid characters. [. , ! ?]"
      );
    postData();
    setShow(false);
    setReload(!reload);
  };

  return (
    <>
      <form>
        <h1>Add New Task</h1>
        <label>Description</label>
        <textarea
          className="new__input new__input--description"
          value={description}
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          minLength="1"
          maxLength="250"
          required
        ></textarea>
        <div>
          <Clear clear={() => setDescription("")} />
          <Submit handleSubmit={handleSubmit} />
        </div>
      </form>
    </>
  );
}
