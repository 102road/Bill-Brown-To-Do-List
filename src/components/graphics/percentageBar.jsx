import React, { useState, useEffect } from "react";

import "./percentageBar.scss";

import calculatePercentage from "../../utils/calculatePercentage";

export default function percentageBar({ items }) {
  const [percent, setPercent] = useState();

  useEffect(() => {
    setPercent(calculatePercentage(items));
  }, []);

  return (
    <>
      <div className="progress">
        <div className="progress__wrapper">
          <p className="progress__title">Progress</p>
          <p>{percent}</p>
        </div>
        <div className="progress__bar">
          <div
            className="progress__bar--percentage"
            style={{ width: `${percent}` }}
          ></div>
        </div>
      </div>
    </>
  );
}
