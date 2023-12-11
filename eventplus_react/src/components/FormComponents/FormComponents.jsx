import React from 'react';
import './FormComponents.css';

export const Input = ({type, id, name, value, required, additionalClass, placeholder, manipulationFunction=""}) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            required={required ? "required" : ""}
            className={`input-component ${additionalClass}`}
            placeholder={placeholder}
            onChange={manipulationFunction}
            autoComplete="off"
        />
    );
};

export const Label = ({htmlFor, labelText}) => {
    return <label htmlFor={htmlFor}>{labelText}</label>
}

//componente criado na forma tradicional props ao invés de destructuring
export const Button = (props) => {
    return (<button id={props.id} name={props.name} type={props.type} className={`button-component ${props.additionalClass}`} onClick={props.manipulationFunction}>{props.textButton}</button>)
}

export const Select = ({required, id, name, options, manipulationFunction, additionalClass = "", defaultValue}) => {
    return (
        <select name={name} id={id} required={required} className={`input-component ${additionalClass}`} onChange={manipulationFunction} >
            {options.map((o) => {
                return (<option key={Math.random()} value={o.value}>{o.text}</option>);
            })}
        </select>
    );
}

// export const Options = () {
//     return()
// }