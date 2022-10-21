import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../apis/database";
import uniqid from "uniqid";
import Clear from "../../../components/buttons/clear";
import Submit from "../../../components/buttons/submit";

const DESCRIPTION_REGEX = /^[A-z0-9-,.? ! ]{1,250}$/;

export default function addNewTaskModal({ setShow, reload, setReload }) {
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const { ProjectTitle, ToDoTitle } = useParams();

  const postData = async () => {
    try {
      await axios.post("/addTask", {
        projectTitle: ProjectTitle,
        toDoTitle: ToDoTitle,
        id: uniqid(),
        description: description,
      });
    } catch (err) {
      if (err.request.status === 404)
        return SetErrorMessage("Server Is Not Responding At This Time.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = DESCRIPTION_REGEX.test(description);
    if (!validate)
      return setMessage("Description contains invalid characters. [. , ! ?]");
    postData();
    setShow(false);
    setReload(!reload);
  };

  return (
    <>
      <form className="task__form">
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
