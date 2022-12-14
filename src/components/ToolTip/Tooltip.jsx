import React from "react";
import "./style/style.css";

const Tooltip = ({ children, message }) => {
  return (
    <strong>
      <span className={"tooltip_container"}>
        {children} <span className="tooltip_message">{message}</span>
      </span>
    </strong>
  );
};

export default Tooltip;
