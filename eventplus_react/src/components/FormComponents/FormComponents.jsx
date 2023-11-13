import React from "react";
import "./FormComponents.css";

export const Input = (
  type,
  id,
  value,
  required,
  additionalClass = "",
  name,
  placeholder,
  manipulationFunction
) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      required={required}
      className={`input-component ${additionalClass}`}
      name={name}
      placeholder={placeholder}
      manipulationFunction={manipulationFunction}
      autoComplete="off"
    />
  );
};
