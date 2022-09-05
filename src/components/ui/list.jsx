import React, { useState, useEffect } from "react";

import "./list.scss";

import ListItem from "./listItem";
import Left from "../../assets/icons/left-chevron.svg";
import Right from "../../assets/icons/right-chevron.svg";

export default function List({ data }) {
  const [list, setList] = useState(data);
  const [array, setArray] = useState([]);

  const [indexStart, setIndexStart] = useState(null);
  const [indexEnd, setIndexEnd] = useState(4);

  useEffect(() => {
    setArray(list.slice(indexStart, indexEnd));
  }, [indexStart]);

  const clickRight = (e) => {
    e.preventDefault();
    setIndexStart(indexStart + 4);
    setIndexEnd(indexEnd + 4);
  };

  const clickLeft = (e) => {
    e.preventDefault();
    setIndexStart(indexStart - 4);
    setIndexEnd(indexEnd - 4);
  };

  return (
    <>
      {!indexStart ? (
        ""
      ) : (
        <img className="arrow--tablet" src={Left} onClick={clickLeft} />
      )}

      <div className="list">
        {array.map((item) => {
          return <ListItem key={item.id} {...item} />;
        })}
      </div>

      {indexEnd < data.length + 1&& (
        <img className="arrow" src={Right} onClick={clickRight} />
      )}
      {!indexStart ? (
        ""
      ) : (
        <img className="arrow--mobile" src={Left} onClick={clickLeft} />
      )}
    </>
  );
}
