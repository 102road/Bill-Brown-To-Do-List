import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../features/main/main.scss";

import axios from "../apis/database";
import Information from "../components/ui/information";
import List from "../components/ui/list";
import AddNew from "../components/buttons/addNew";

export default function singleProject() {
  //State Hooks
  const [project, setProject] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Param Hooks
  const { ProjectTitle } = useParams();

  //Axios Function
  const fetchData = async () => {
    try {
      const res = await axios.get(ProjectTitle);
      setProject(res);
    } catch (err) {
      if (err.request.status === 400) {
        setErrorMessage("Project Could Not Be Found");
        return;
      }
      if (err.request.status === 404) {
        setErrorMessage("Server Is Not Responding At This Time.");
      }
    }
  };

  return (
    <>
      {/*Loading Screen*/}
      {isLoading && <p>Loading ...</p>}

      {/*Error Screen*/}
      {!isLoading && error && <p>{error}</p>}

      {/*shows information section of the project*/}
      {!isLoading && !error && project?.type && (
        <Information {...project} items={project.toDos} />
      )}

      {/*shows todo list of project if it exists */}
      {!isLoading && !error && project.toDos?.length > 0 && (
        <>
          <section className="heading">
            <AddNew type="ToDo" />
            <List data={project.toDos} />
          </section>
        </>
      )}

      {/*shows message if there are no todos*/}
      {!isLoading && !error && project.toDos?.length === 0 && (
        <>
          <section className="footing">
            <p className="footing__title">No To Dos</p>
            <AddNew type="ToDo" />
          </section>
        </>
      )}
    </>
  );
}
