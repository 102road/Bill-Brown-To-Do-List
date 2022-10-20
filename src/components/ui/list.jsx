import React from "react";

import "./list.scss";

import ListItem from "./listItem";

export default function List({ data }) {
  return (
    <>
      <article className="list">
        {data?.length &&
          data.map((item) => {
            return <ListItem key={item.key} {...item} />;
          })}
      </article>
    </>
  );
}
