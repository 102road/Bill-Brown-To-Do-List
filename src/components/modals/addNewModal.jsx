import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import uniqid from "uniqid";
import { format } from "date-fns";

import "./addNewModal.scss";

import axios from "../../apis/database";
import useAxiosFunction from "../../hooks/useAxiosFunction";

import Clear from "../buttons/clear";
import Submit from "../buttons/submit";

const TITLE_REGEX = /^[A-z0-9-,.? ]{1,25}$/;
const DESCRIPTION_REGEX = /^[A-z0-9-,.? ]{1,100}$/;

export default function addNewModal({ type, setShow, reload, setReload }) {
  const [response, errorMessage, error, isLoading, axiosFetch] =
    useAxiosFunction();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [validTitle, setValidTitle] = useState(false);
  const [validDescription, setValidDescription] = useState(false);
  const [validDate, setValidDate] = useState(false);
  const [validTime, setValidTime] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    setValidTitle(TITLE_REGEX.test(title));
  }, [title]);

  useEffect(() => {
    setValidDescription(DESCRIPTION_REGEX.test(description));
  }, [description]);

  useEffect(() => {
    setMessage(error);
  }, [error]);

  const { ProjectTitle, ToDoTitle } = useParams();

  const postData = (e) => {
    axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: `/add${type}`,
      requestConfig: {
        id: uniqid(),
        projectTitle: ProjectTitle,
        toDoTitle: ToDoTitle,
        title: title,
        description: description,
        date: date,
        time: time,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const v1 = TITLE_REGEX.test(title);
    const v2 = DESCRIPTION_REGEX.test(description);

    if (!v1) return setMessage("Title not valid");
    if (!v2) return setMessage("Description not valid");

    postData();
    setShow(false);
    setReload(!reload);
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
  };

  return (
    <>
      <form className="new__form" onSubmit={handleSubmit}>
        <div className="new__container">
          <button className="new__button" onClick={() => setShow(false)}>
            X
          </button>

          <h1 className="new__header">Add New</h1>

          {error && <p className="message">{errorMessage}</p>}

          <div className="new__label">
            <label className="new__title">Title</label>
          </div>

          <input
            className="new__input"
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            minLength="1"
            maxLength="25"
            required
          ></input>

          <div className="new__label">
            <label className="new__title">Description</label>
          </div>

          <textarea
            className="new__input new__input--description"
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            minLength="1"
            maxLength="100"
            required
          ></textarea>

          <div className="new__label">
            <label className="new__title">Date</label>
          </div>

          <input
            className="new__input--short"
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
            required
            min={format(Date.now(), "yyyy-MM-dd")}
          ></input>

          <div className="new__label">
            <label className="new__title">Time</label>
          </div>

          <input
            className="new__input--short"
            value={time}
            type="time"
            onChange={(e) => setTime(e.target.value)}
            required
          ></input>

          <div className="new__buttons">
            <Clear handleClear={handleClear} />
            <Submit handleSubmit={handleSubmit} />
          </div>
        </div>
      </form>
    </>
  );
}
