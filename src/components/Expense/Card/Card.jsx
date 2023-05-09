import React from "react";
import "./Card.css";

const Card = (props) => {

    const classess = 'card ' + props.className;

  return (
    <div>
          <div className={classess}>{props.children}</div>
    </div>
  );
};

export default Card;
