import React from "react";
import './Title.css';

const Title = ( {titleText, color = "", marginTop = ""} ) => {
    return(
        <h1 className={ `title ${marginTop}` } style={ {color: color} }>
            {titleText}
            <hr className="title__underscore" style={ {borderColor: color} }/>
        </h1>
    );
}
    
export default Title;