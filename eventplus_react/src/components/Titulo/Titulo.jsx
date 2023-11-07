import React from "react";
import "./Titulo.css";

const Titulo = ({ titleText, additionalClass = "", color = "" }) => {
  return (
    <h1 className={`title ${additionalClass}`} style={{ color }}>
      {titleText}
      <hr className="title__underscore" style={{ borderColor: color }} />
    </h1>
  );
};

export default Titulo;
