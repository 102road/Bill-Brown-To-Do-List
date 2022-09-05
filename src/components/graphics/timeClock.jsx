import React from "react";

import './timeClock.scss'

export default function timeClock({time}) {
  return (
    <div className="time">
      <p className="time__info">{time}</p>
    </div>
  );
}
