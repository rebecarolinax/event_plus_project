import React from "react";
import "./Button.css";

const Button = ({ type, textButton }) => {
  return <button type={type}>{textButton}</button>;
};

export default Button;
