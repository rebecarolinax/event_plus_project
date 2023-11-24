import React from "react";
import './Titulo.css'

const Titulo = ({ titleText, color = "", potatoClass = "" }) => {
  return (
    <h1 className={`title  ${potatoClass}`} style={ {color: color}}>
      {titleText}
      <hr
        className="title__underscore"
        style={{ borderColor: color }}
      />
    </h1>
  );
};

export default Titulo;
