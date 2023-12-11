import React from 'react';

const Button = ({ handleClick }) => {
    return (
        <button type='submit' onClick={handleClick}>
            Calcular
        </button>
    );
};

export default Button;