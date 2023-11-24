import React from 'react';
import defaultImage from '../../assets/images/default-image.jpeg'
import './ImageIllustrator.css'


const ImageIllustrator = ({alteText, imageRender=defaultImage, additionalClass=""}) => {
    // let imageResource;
    // switch (imageRender="") {
    //     case 'tipo-evento':
    //         imageResource = tipoEventoImagem
    //         break;
    //     case 'evento':
    //         imageResource = eventoImagem
    //         break;
    
    //     default:
    //         imageResource = defaultImage
    //         break;
    // }
    return (
        <figure className="illustrator-box">
         <img src={imageRender} 
         alt={alteText}
         className= {`illustrator-box__image ${additionalClass}`}
         />
        </figure>
    );
};

export default ImageIllustrator;