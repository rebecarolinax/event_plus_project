import { useState } from 'react';

const Input = ({ number, setNumber, placeholder, name, id }) => {
    return (
        <div>
            <input 
                type='number'
                placeholder={placeholder}
                name={name}
                id={id}
                onChange={e => {
                    setNumber(e.target.value)
                }}
            />
            <p>{number}</p>
        </div>
    );
};

export default Input;