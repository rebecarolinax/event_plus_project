import React from "react";
import "./ImageIllustrator.css";

import imageDefault from "../../assets/images/images/default-image.jpeg";

const ImageIllustrator = ({
  alterText,
  imageRender = imageDefault,
  additionalClass = "",
}) => {
  return (
    <figure className="illustrator-box ">
      <img
        className={`illustrator-box__image ${additionalClass}`}
        src={imageRender}
        alt={alterText}
      />
    </figure>
  );
};

export default ImageIllustrator;
