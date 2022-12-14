import React, { useState } from "react";
import { useParams } from "react-router-dom";
import uniqid from "uniqid";
import { format } from "date-fns";

import "./addNewModal.scss";

import axios from "../../apis/database";

import Clear from "../buttons/clear";
import Submit from "../buttons/submit";

const TITLE_REGEX = /^[A-z0-9-,.? ]{1,25}$/;
const DESCRIPTION_REGEX = /^[A-z0-9-,.? ]{1,100}$/;

export default function addNewModal({ type, show, setShow }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { ProjectTitle, ToDoTitle } = useParams();

  const postData = async () => {
    try {
      await axios.post(`/add${type}`, {
        id: uniqid(),
        projectTitle: ProjectTitle,
        toDoTitle: ToDoTitle,
        title: title,
        description: description,
        date: date,
        time: time,
      });
      setSuccess(true);
    } catch (err) {
      if (err.request.status === 400) {
        setError(true);
        setErrorMessage(
          `${type} Was Not Added To The System, Please Try Again Later.`
        );
        return;
      }
      if (err.request.status === 401) {
        setError(true);
        setMessage("You Do Not Have The Authority To Do This.");
        return;
      }
      if (err.request.status === 404) {
        setError(true);
        setMessage(
          "Server Is Not Responding At This Time, Please Try Again Later"
        );
        return;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const v1 = TITLE_REGEX.test(title);
    const v2 = DESCRIPTION_REGEX.test(description);

    if (!v1) return setErrorMessage("Title not valid");
    if (!v2) return setErrorMessage("Description not valid");

    postData();
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      {show && !success && (
        <article className="new">
          <form className="new__form" onSubmit={handleSubmit}>
            <div className="new__container">
              <button className="new__button" onClick={() => setShow(false)}>
                X
              </button>

              <h1 className="new__header">Add New</h1>

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
                <label className="new__title">Max: 100</label>
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

              <div>
                <p>{errorMessage}</p>
              </div>
            </div>
          </form>
        </article>
      )}
      {success && (
        <article className="pop-up">
          <p className="pop-up__message">
            {`${type}s`} Has Been Added Successfully
          </p>
          <button className="button" onClick={handleReload}>{`${type}`}</button>
        </article>
      )}
      {error && (
        <article className="pop-up">
          <p className="pop-up__message">
            {`${type}`} Was Not Created, Please Try Again.
          </p>
          <button className="button" onClick={handleReload}>
            Refresh
          </button>
        </article>
      )}
    </>
  );
}
