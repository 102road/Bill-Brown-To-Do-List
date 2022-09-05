import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../../apis/database";

import "./complete.scss";

import Tick from "../../assets/icons/tick.svg";

import useAxiosFunction from "../../hooks/useAxiosFunction";

export default function complete({ type, complete, title, id }) {
  const [completeState, setCompleteState] = useState(complete);

  const { ProjectTitle, ToDoTitle } = useParams();

  const [response, error, isLoading, axiosFetch] = useAxiosFunction();

  const createURL = () => {
    if (type === "Project") return `/${title}/complete`;
    if (type === "ToDo") return `/${ProjectTitle}/${title}/complete`;
    if (type === "Task") return `/${ProjectTitle}/${ToDoTitle}/${id}/complete`;
  };

  const postData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "PUT",
      url: createURL(),
      requestConfig: { complete: completeState },
    });
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
