import './FormComponents.css';

export const Input = ( {
    id,
    name,
    value,
    type,
    required,
    additionalClassName,
    placeholder,
    handleChange
} ) => {
    return (
        <input 
            type={type} 
            id={id}
            name={name}
            required={required ? 'required' : ""}
            className={`input-component ${additionalClassName}`}
            placeholder={placeholder}
            onChange={handleChange}
            autoComplete='off'
            value={value}
        />
    );
}

export const Label = ({htmlFor, labelText}) => {
    return <label htmlFor={htmlFor}>{labelText}</label>
}

export const Button = ( {
    name,
    id,
    textButton = 'Button',
    type = 'submit',
    additionalClassName = '',
    handleClick
} ) => {
    return (
        <button 
            name={name}
            id={id}
            type={type}
            onClick={handleClick}
            className={`button-component ${additionalClassName}`}
        >
            {textButton}
        </button>
    )
}

export const Select = ( { 
    id,
    name,
    options = [],
    handleChange,
    required,
    additionalClassNmae = '',
    handleClick,
    value = '',
    firstOption = 'Selecione'
} ) => {
    return (
        <select 
            name={name} 
            id={id}
            className={`input-component ${additionalClassNmae}`}
            onChange={handleChange}
            onClick={handleClick}
            value={value}
        >
            <option value="">{`${firstOption}:`}</option>
            {options.map((option, index) => <option key={index} value={option.value}>{option.text}</option>)}
        </select>
    );
}