import React from 'react';

import './Title.css';

const Title = ( {text, color = '', additionalClassName} ) => {
    return (
        <h1 className={ `title ${additionalClassName}` } style={ {color: color} }>
            {text}
            <hr 
                className='title__underscore'
                style={ { borderColor: color } }
            />
        </h1>
    );
};

export default Title;