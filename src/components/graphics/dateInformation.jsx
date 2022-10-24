import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";

import dateCalculator from "../../utils/dateCalculator";

import "./dateInformation.scss";

export default function dateInformation({ type, date, dateAdded }) {
  const [modifiedDate, setModifiedDate] = useState();
  const [newDate, setNewDate] = useState();

  useEffect(() => {
    date ? setNewDate(dateCalculator(date)) : setNewDate(null);
    setModifiedDate(format(parseISO(dateAdded), "MM/dd/yyyy"));
  }, []);

  return (
    <>
      <div className="container">
        <p>Date Added:</p>
        <p className="figure">{modifiedDate}</p>
      </div>
      {date && (
        <div className="container">
          <p>{type} due in:</p>
          <p className="figure">{newDate}</p>
        </div>
      )}
    </>
  );
}
