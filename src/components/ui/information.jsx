import React, { useState } from "react";

import "./information.scss";

import Edit from "../buttons/edit";
import Delete from "../buttons/delete";
import Complete from "../graphics/complete";
import DateInformation from "../graphics/dateInformation";
import CalenderDate from "../graphics/calenderDate";
import TimeClock from "../graphics/timeClock";
import PercentageBar from "../graphics/percentageBar";

export default function information({
  type,
  title,
  description,
  date,
  time,
  dateAdded,
  complete,
  items,
}) {
  const [reload, setReload] = useState(false);
  return (
    <>
      <article className="information">
        <section className="header">
          <div className="header__container">
            <h1 className="header__title">{title}</h1>
            <Complete complete={complete} title={title} />
          </div>
          <div className="header__main">
            <p className="header__description">{description}</p>
          </div>
          <div className="header__icons">
            <Edit type={type} title={title} description={description} reload={reload} setReload={setReload}/>
            <Delete
              type={type}
              title={title}
              reload={reload}
              setReload={setReload}
            />
          </div>
        </section>
        <section className="footer">
          <div className="footer__details">
            <DateInformation type={type} date={date} dateAdded={dateAdded} />
          </div>
          <div className="footer__icons">
            <div className="footer__container">
              <TimeClock time={time} />
              <CalenderDate date={date} />
            </div>
            <div className="footer__last">
              {type !== "Task" && <PercentageBar items={items} />}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
