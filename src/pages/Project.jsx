import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../features/main/main.scss";

import axios from "../apis/database";
import Information from "../components/ui/information";
import List from "../components/ui/list";
import AddNew from "../components/buttons/addNew";

export default function singleProject() {
  //State Hooks
  const [project, setProject] = useState('');
  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Param Hooks
  const { ProjectTitle } = useParams();

  //useEffect Hooks
  useEffect(() => {
    fetchData();
  }, []);

  //Axios Function
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/${ProjectTitle}`);
      setProject(res.data);
      setIsLoading(false);
    } catch (err) {
      if (err.request.status === 400) {
        setError(true);
        setErrorMessage("Project Could Not Be Found");
        setIsLoading(false);
        return;
      }
      if (err.request.status === 404) {
        setError(true);
        setErrorMessage("Server Is Not Responding At This Time.");
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/*Loading Screen*/}
      {isLoading && <p>Loading ...</p>}

      {/*Error Screen*/}
      {!isLoading && error && <p>{errorMessage}</p>}

      {/*shows information section of the project*/}
      {!isLoading && !error && project && (
        <Information {...project} items={project?.toDos} />
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
