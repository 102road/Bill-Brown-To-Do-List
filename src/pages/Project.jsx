import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../features/main/main.scss";

import axios from "../apis/database";
import useAxiosFunction from "../hooks/useAxiosFunction";

import Information from "../components/ui/information";
import List from "../components/ui/list";
import AddNew from "../components/buttons/addNew";

export default function singleProject() {
  //Declare Hooks
  const [reload, setReload] = useState();
  const { ProjectTitle } = useParams();

  const [project, error, isLoading, axiosFetch] = useAxiosFunction();

  useEffect(() => {
    fetchData();
  }, [reload]);

  //Functions
  const fetchData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "get",
      url: `/${ProjectTitle}`,
    });
  };

  return (
    <>
      {isLoading && <p>Loading ...</p>}

      {!isLoading && error && <p>{error}</p>}

      {!isLoading && !error && project?.type && (
        <Information {...project} items={project.toDos} />
      )}

      {!isLoading && !error && project.toDos?.length > 0 && (
        <>
          <section className="heading">
            <AddNew type="ToDo" reload={reload} setReload={setReload} />
            <List data={project.toDos} />
          </section>
        </>
      )}

      {!isLoading && !error && project.toDos?.length === 0 && (
        <>
          <section className="footing">
            <p className="footing__title">No To Dos</p>
            <AddNew type="ToDo" reload={reload} setReload={setReload} />
          </section>
        </>
      )}
    </>
  );
}
