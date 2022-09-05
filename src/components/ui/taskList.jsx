import React from "react";

import TaskItem from "./taskItem";

export default function taskList({ tasks, reload, setReload }) {
  return (
    <>
      <div className="list">
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              {...task}
              reload={reload}
              setReload={setReload}
            />
          );
        })}
      </div>
    </>
  );
}
