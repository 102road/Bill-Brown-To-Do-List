import React, { useEffect } from "react";

import "./calenderDate.scss";

import useDateConverter from "../../utils/useDateConverter";

export default function dateTime({ date, time }) {
  const [day, month, year, dateConverter] = useDateConverter();

  useEffect(() => {
    dateConverter(date);
  }, []);

  return (
    <>
      <div className="date">
        <p className="date__info date__info--month">{month}</p>
        <p className="date__info date__info--day">{day}</p>
      </div>
      
    </>
  );
}
