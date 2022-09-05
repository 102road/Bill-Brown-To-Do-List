import { useState, useEffect } from "react";

const useDateConverter = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState('');

  const dateConverter = (date) => {
    const newDate = date.split('-');
    setDay(newDate[2]);
    setYear(newDate[0])

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const index = parseInt(newDate[1], 10) - 1;

    setMonth(months[index]);
  };

  return [day, month, year, dateConverter];
};

export default useDateConverter;
