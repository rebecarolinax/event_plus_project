import React from "react";
import "./Input.css";

const Input = ({ fnChange, type, placeholder, name, id, value }) => {
  // const [numero1, setNumero1] = useState(); // dado do componente em tempo real
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={fnChange}
        autoComplete="off"
      />
      <span>{value}</span>
    </>
  );
};

export default Input;
