import React, { useState } from "react";

import "./taskList.scss";

import Down from "../../assets/icons/down-chevron.svg";
import Up from "../../assets/icons/up-chevron.svg";
import DateInformation from "../graphics/dateInformation";
import Complete from "../graphics/complete";

export default function taskItem({ id, description, complete, dateAdded }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <article className="task__item">
        <section className="task__container">
          <h1 className="task__title">{description}</h1>
          {!show && (
            <img className="icon" src={Down} onClick={() => setShow(!show)} />
          )}
          {show && (
            <img className="icon" src={Up} onClick={() => setShow(!show)} />
          )}
        </section>

        {show && (
          <>
            <section className="task__footer">
              <DateInformation type="Task" dateAdded={dateAdded} />
                <Complete complete={complete} id={id} />
            </section>
          </>
        )}
      </article>
    </>
  );
}
