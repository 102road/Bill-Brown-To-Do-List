import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { format } from "date-fns";

import "./edit.scss";

import axios from "../../apis/database";

import Clear from "../buttons/clear";
import Submit from "../buttons/submit";

const TITLE_REGEX = /^[A-z0-9-,.? ]{1,25}$/;
const DESCRIPTION_REGEX = /^[A-z0-9-,.? ]{1,100}$/;

export default function edit({ type, title, description, show, setShow }) {
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { ProjectTitle, ToDoTitle } = useParams();

  const createURL = () => {
    if (type === "Project") return `/${title}/edit`;
    if (type === "ToDo") return `/${ProjectTitle}/${title}/edit`;
  };

  const postData = async () => {
    try {
      const url = createURL();
      await axios.put(url, {
        projectTitle: ProjectTitle,
        toDoTitle: ToDoTitle,
        title: editTitle,
        description: editDescription,
        date: editDate,
        time: editTime,
      });
    } catch (err) {
      if (err.request.status === 401)
        return setErrorMessage(`${type} Failed To Edit. Please Try Again.`);
      if (err.request.status === 404)
        return setErrorMessage(
          "Server Is Not Responding At This Time. Please Try Again Later."
        );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const v1 = TITLE_REGEX.test(title);
    const v2 = DESCRIPTION_REGEX.test(description);

    if (!v1) return setErrorMessage("Title not valid");
    if (!v2) return setErrorMessage("Description not valid");

    postData();
    setShow(false);
    setReload(!reload);
  };

  const handleClear = () => {
    setEditTitle("");
    setEditDescription("");
    setEditDate("");
    setEditTime("");
  };
  return (
    <>
      {/*main edit form*/}
      {show && !success && (
        <article className="edit">
          <form className="edit__form" onSubmit={handleSubmit}>
            <div className="edit__container">
              <button className="edit__button" onClick={() => setShow(false)}>
                X
              </button>

              <h1 className="edit__header">Edit</h1>

              <div className="edit__label">
                <label className="edit__title">Title</label>
              </div>

              <input
                className="edit__input"
                value={title}
                type="text"
                onChange={(e) => setEditTitle(e.target.value)}
                minLength="1"
                maxLength="25"
                required
              ></input>

              <div className="edit__label">
                <label className="edit__title">Description</label>
              </div>

              <textarea
                className="edit__input edit__input--description"
                value={description}
                type="text"
                onChange={(e) => setEditDescription(e.target.value)}
                minLength="1"
                maxLength="100"
                required
              ></textarea>

              <div className="edit__label">
                <label className="edit__title">Date</label>
              </div>

              <input
                className="edit__input--short"
                type="date"
                onChange={(e) => setEditDate(e.target.value)}
                required
                min={format(Date.now(), "yyyy-MM-dd")}
              ></input>

              <div className="edit__label">
                <label className="edit__title">Time</label>
              </div>

              <input
                className="edit__input--short"
                type="time"
                onChange={(e) => setEditTime(e.target.value)}
                required
              ></input>

              <div className="edit__buttons">
                <Clear handleClear={handleClear} />
                <Submit handleSubmit={handleSubmit} />
              </div>

              <div>
                <p>{errorMessage}</p>
              </div>
            </div>
          </form>
        </article>
      )}

      {/*success message*/}
      {success && (
        <artcle className="pop-up">
          <p className="pop-up__message">
            {`${type}`} Has Been Added Successfully
          </p>
          <button
            className="button"
            onClick={() => setShow(false)}
          >{`${type}`}</button>
        </artcle>
      )}

      {/*error message*/}
      {error && (
        <article className="pop-up">
          <p className="pop-up__message">
            {`${type}`} Was Not Created, Please Try Again.
          </p>
          <button className="button" onClick={window.location.reload()}>
            Refresh
          </button>
        </article>
      )}
    </>
  );
}
