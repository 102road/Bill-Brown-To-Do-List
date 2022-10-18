import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../../apis/database";

import "./complete.scss";

import Tick from "../../assets/icons/tick.svg";

export default function complete({ type, complete, title, id }) {
  const [completeState, setCompleteState] = useState(complete);
  const [errorMessage, setErrorMessage] = useState("");

  const { ProjectTitle, ToDoTitle } = useParams();

  const createURL = () => {
    if (type === "Project") return `/${title}/complete`;
    if (type === "ToDo") return `/${ProjectTitle}/${title}/complete`;
    if (type === "Task") return `/${ProjectTitle}/${ToDoTitle}/${id}/complete`;
  };

  const postData = async () => {
    const url = createURL();
    try {
      axios.delete(url);
    } catch (err) {
      if (err.request.status === 400) return setErrorMessage("Action Failed");
      if (err.request.status === 404)
        return setErrorMessage("Server Is Not Responding At This Time.");
    }
  };

  useEffect(() => {
    postData();
  }, [completeState]);

  return (
    <>
      <div>
        {completeState && (
          <div
            className="complete"
            onClick={() => setCompleteState(!completeState)}
          >
            <img className="complete__icon" src={Tick} />
          </div>
        )}
        {!completeState && (
          <div
            className="incomplete"
            onClick={() => setCompleteState(!completeState)}
          >
            <img className="incomplete__icon" src={Tick} />
          </div>
        )}
      </div>
    </>
  );
}
