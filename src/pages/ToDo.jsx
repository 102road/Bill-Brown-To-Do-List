import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../apis/database";

import Information from "../components/ui/information";
import TaskList from "../components/ui/taskList";

export default function singleToDo() {
  // state hooks
  const [toDo, setToDo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  // param hook
  const { ProjectTitle, ToDoTitle } = useParams();

  //useEffect Hook

  useEffect(() => {
    fetchData();
  }, []);

  // axios function
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/${ProjectTitle}/${ToDoTitle}`);
      setToDo(res.data);
      setIsLoading(false);
    } catch (err) {
      if (err.request.status === 400) {
        setError(true);
        setErrorMessage("ToDo Could Not Be Found At This Time.");
        setIsLoading(false);
      }
      if (err.request.status === 404) {
        setError(true);
        setErrorMessage("Server Is Not Responding At This Time");
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/*loading screen */}
      {isLoading && <p>Loading ...</p>}

      {/*error screen */}
      {!isLoading && error && <p>{errorMessage}</p>}

      {/*information section */}
      {!isLoading && !error && toDo && (
        <Information {...toDo} items={toDo?.tasks} />
      )}

      {/*task list*/}
      {!isLoading && !error && toDo.tasks?.length > 0 && (
        <section className="task">
          <TaskList tasks={toDo.tasks} />
        </section>
      )}

      {/*shows when the todo has no tasks, prompts user to create a new task*/}
      {!isLoading && !error && toDo.tasks?.length === 0 && (
        <>
          <section className="footing">
            <p className="footing__title">No Tasks</p>
          </section>
        </>
      )}
    </>
  );
}
