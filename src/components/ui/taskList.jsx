import React from "react";

import TaskItem from "./taskItem";

import './taskList.scss';

export default function taskList({ tasks}) {
  return (
    <>
      <div className="task">
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              {...task}
            />
          );
        })}
      </div>
    </>
  );
}
