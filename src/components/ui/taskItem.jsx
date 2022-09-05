import React from "react";

import "./taskItem.scss";

import Complete from "../graphics/complete";
import Delete from "../../components/buttons/delete";

export default function taskItem({ id, description, complete, reload, setReload }) {
  return (
    <>
      <section className="task">
        <h1 className="task__title">{description}</h1>
        <div className="task__footer">
          <Complete complete={complete} id={id} />
          <Delete
            type="Task"
            title={description}
            id={id}
            reload={reload}
            setReload={setReload}
          />
        </div>
      </section>
    </>
  );
}
