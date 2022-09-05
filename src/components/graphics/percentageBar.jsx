import React, { useState, useEffect } from "react";

import "./percentageBar.scss";

import calculatePercentage from "../../utils/calculatePercentage";

export default function percentageBar({ items }) {
  const [percent, setPercent] = useState();

  console.log(items);

  useEffect(() => {
    setPercent(calculatePercentage(items));
  }, []);

  return (
    <>
      <div className="progress">
        <p className="progress-title">Progress</p>
        <div className="progress__bar">
          <div
            className="progress__bar--percentage"
            style={{ width: `${percent}` }}
          ></div>
          <p>{percent}</p>
        </div>
      </div>
    </>
  );
}
