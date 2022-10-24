import React from "react";
import DateInformation from "../graphics/dateInformation";
import TimeClock from "../graphics/timeClock";
import CalenderDate from '../graphics/calenderDate';
import PercentageBar from '../graphics/percentageBar';

export default function informationSection({type, time, date, dateAdded, items }) {
  return (
    <section className='footer'>
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
  );
}
