import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { format } from "date-fns";

import "./edit.scss";

import axios from "../../apis/database";

import useAxiosFunction from "../../hooks/useAxiosFunction";

import Clear from "../buttons/clear";
import Submit from "../buttons/submit";

const TITLE_REGEX = /^[A-z0-9-,.? ]{1,25}$/;
const DESCRIPTION_REGEX = /^[A-z0-9-,.? ]{1,100}$/;

export default function edit({
  type,
  title,
  description,
  reload,
  setReload,
  setShow,
}) {
  const [response, error, isLoading, axiosFetch] = useAxiosFunction();

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  const [validTitle, setValidTitle] = useState(false);
  const [validDescription, setValidDescription] = useState(false);
  const [validDate, setValidDate] = useState(false);
  const [validTime, setValidTime] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setValidTitle(TITLE_REGEX.test(title));
  }, [title]);

  useEffect(() => {
    setValidDescription(DESCRIPTION_REGEX.test(description));
  }, [description]);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const { ProjectTitle, ToDoTitle } = useParams();

  const createURL = () => {
    if (type === "Project") return `/${title}/edit`;
    if (type === "ToDo") return `/${ProjectTitle}/${title}/edit`;
  };

  const postData = (e) => {
    axiosFetch({
      axiosInstance: axios,
      method: "PUT",
      url: createURL(),
      requestConfig: {
        projectTitle: ProjectTitle,
        toDoTitle: ToDoTitle,
        title: editTitle,
        description: editDescription,
        date: editDate,
        time: editTime,
      },
    });
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
      <div className="edit">
        <form className="edit__form" onSubmit={handleSubmit}>
          <div className="edit__container">
            <button className="edit__button" onClick={() => setShow(false)}>
              X
            </button>

            <h1 className="edit__header">Edit</h1>

            {error && <p className="message">{errorMessage}</p>}

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
          </div>
        </form>
      </div>
    </>
  );
}
