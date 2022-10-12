import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../apis/database";

import Information from "../components/ui/information";
import TaskList from "../components/ui/taskList";
import AddNewTask from "../features/main/buttons/addNewTask";

export default function singleToDo() {
  // state hooks
  const [toDo, setToDo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  // param hook
  const { ProjectTitle, ToDoTitle } = useParams();

  // axios function
  const fetchData = () => {
    setIsLoading(true);
    try {
      const res = axios.get(`/${ProjectTitle}/${ToDoTitle}`);
      setToDo(res);
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
  // useEffect hook
  useEffect(() => {
    fetchData();
  }, [reload]);

  return (
    <>
      {/*loading screen */}
      {isLoading && <p>Loading ...</p>}

      {/*error screen */}
      {!isLoading && error && <p>{errorMessage}</p>}

      {/*information section */}
      {!isLoading && !error && toDo?.type && (
        <Information {...toDo} items={toDo.tasks} />
      )}

      {/*task list*/}
      {!isLoading && !error && toDo.tasks?.length > 0 && (
        <section className="heading">
          <AddNewTask reload={reload} setReload={setReload} />
          <TaskList tasks={toDo.tasks} reload={reload} setReload={setReload} />
        </section>
      )}

      {/*shows when the todo has no tasks, prompts user to create a new task*/}
      <section className="footing">
        {!isLoading && !error && toDo.tasks?.length === 0 && (
          <>
            <p className="footing__title">No Tasks</p>
            <AddNewTask reload={reload} setReload={setReload} />
          </>
        )}
      </section>
    </>
  );
}
