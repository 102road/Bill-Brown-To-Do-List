import React, { useState, useEffect } from "react";

import "../features/main/main.scss";

import List from "../components/ui/list";
import AddNew from "../components/buttons/addNew";

import axios from "../apis/database";

export default function projects() {
  // Hooks
  const [projects, setProjects] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/projects');
      setProjects(res.data);
      setIsLoading(false);
    } catch (err) {
      if (err.request.status === 400) {
        setError(true);
        setErrorMessage("There Are No Projects To Show.");
        setIsLoading(false);
      }
      if (err.request.status === 403) {
        setError(true);
        setErrorMessage(
          "You Do Not Have Authorization To Perform This Action."
        );
        setIsLoading(false);
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
      <article className="projects">
        <nav className="heading">
          <h1 className="heading__title">Projects</h1>
          <AddNew type="Project" />
        </nav>

        {isLoading && <p>Loading...</p>}

        {!isLoading && error && <p>{errorMessage}</p>}

        <div>
          {!isLoading && !error && projects?.length > 0 && (
            <List data={projects} />
          )}
        </div>
      </article>
    </>
  );
}
