import React from 'react';
import './ImageIllustrator.css';
import defaultImg from '../../assets/images/images/default-image.jpeg';

const ImageIllustrator = ({altText, imgRender = defaultImg, additionalClass = ""}) => {
    
    return (
        <figure className="illustrator-box">
            <img 
                src={imgRender}
                alt={altText}
                className={`illustrator-box__image ${additionalClass}`}
            />
        </figure>
    );
};

export default ImageIllustrator;