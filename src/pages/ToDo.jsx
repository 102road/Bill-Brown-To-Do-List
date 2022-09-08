import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "../apis/database";
import useAxiosFunction from "../hooks/useAxiosFunction";

import Information from "../components/ui/information";
import TaskList from "../components/ui/taskList";
import AddNewTask from "../features/main/buttons/addNewTask";

export default function singleToDo() {
  const [reload, setReload] = useState(false);

  const { ProjectTitle, ToDoTitle } = useParams();

  const [toDo, errorMessage, error, isLoading, fetchAxios] = useAxiosFunction();

  const fetchData = () => {
    fetchAxios({
      axiosInstance: axios,
      method: "get",
      url: `/${ProjectTitle}/${ToDoTitle}`,
    });
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  return (
    <>
      {isLoading && <p>Loading ...</p>}

      {!isLoading && error && <p>{error}</p>}

      {!isLoading && !error && toDo?.type && (
        <Information {...toDo} items={toDo.tasks} />
      )}

      {!isLoading && !error && toDo.tasks?.length > 0 && (
        <section className="heading">
          <AddNewTask reload={reload} setReload={setReload} />
          <TaskList tasks={toDo.tasks} reload={reload} setReload={setReload} />
        </section>
      )}

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
