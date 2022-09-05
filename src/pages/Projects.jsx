import React, { useState, useEffect } from "react";

import "../features/main/main.scss";

import List from "../components/ui/list";
import AddNew from "../components/buttons/addNew";

import axios from "../apis/database";
import useAxiosFunction from "../hooks/useAxiosFunction";

export default function projects() {
  // Hooks
  const [reload, setReload] = useState();

  const [projects, error, isLoading, axiosFetch] = useAxiosFunction();

  const fetchData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "get",
      url: "",
    });
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  return (
    <>
      <article className="projects">
        <nav className="heading">
          <h1 className="heading__title">Projects</h1>
          <AddNew type="Project" reload={reload} setReload={setReload} />
        </nav>

        {isLoading && <p>Loading...</p>}

        {!isLoading && error && <p>{error}</p>}

        <div>
          {!isLoading && !error && projects?.length > 0 && (
            <List data={projects} reload={reload} setReload={setReload} />
          )}
        </div>
      </article>
    </>
  );
}
