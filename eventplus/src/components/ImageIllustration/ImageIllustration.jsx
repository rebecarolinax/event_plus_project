import React from 'react';
import './ImageIllustration.css';
import DefaultImage from '../../assets/images/default-image.jpeg';

const ImageIllustration = ({ altText, image = DefaultImage, additionalClass = '' }) => {
    return (
        <figure className='illustrator-box'>
            <img 
                src={image}
                alt={altText}
                className={`illustrator-box__image ${additionalClass}`}    
            />
        </figure>
    );
};

export default ImageIllustration;