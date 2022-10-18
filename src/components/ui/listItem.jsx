import React from "react";
import { Link } from "react-router-dom";

import "./listItem.scss";

import Complete from "../graphics/complete";
import CalenderDate from "../graphics/calenderDate";
import TimeClock from "../graphics/timeClock";
import PercentageBar from "../graphics/percentageBar";

export default function listItem({
  type,
  projectTitle,
  id,
  title,
  description,
  date,
  time,
  complete,
  toDos,
  tasks,
}) {
  const createURL = () => {
    if (type === "Project") return `/${title}`;
    if (type === "ToDo") return `/${projectTitle}/${title}`;
  };
  return (
    <div className="item">
      <Link to={createURL()}>
        <section className="item__container">
          <div className="item__header">
            <div className="item__main">
              <h1 className="item__title">{title}</h1>
              <Complete type={type} complete={complete} title={title} id={id} />
            </div>

            <p className="item__description">{description}</p>
          </div>

          <div className="item__graphics">
            <div className="item__icons">
              <TimeClock time={time} />
              <CalenderDate date={date} />
            </div>

            <div className="item__percentage">
              {type !== "Task" && (
                <PercentageBar items={toDos ? toDos : tasks} />
              )}
            </div>
          </div>
        </section>
      </Link>
    </div>
  );
}
