import React from 'react';
import './NextEvent.css';

import { Tooltip } from 'react-tooltip';

import { dateFormatDbToView } from '../../utils/stringFunctions';

const NextEvent = ( {title, description, date, idEvent} ) => {
    function conectar(e) {
        e.preventDefault();
        alert(`Conectando: ${idEvent}`)
    }

    return (
        <article className='event-card'>
            <h2 className="event-card__title">{title.substring(0, 15)}...</h2>
            <p 
                className="event-card__description"
                data-tooltip-id={idEvent}
                data-tooltip-content={description}
                data-tooltip-place="top"
            >
                {description.substring(0, 15)}...
                <Tooltip id={idEvent} className='tooltip' />
            </p>
            <p className="event-card__description">{dateFormatDbToView(date)}</p>
            <a onClick={conectar} className="event-card__connect-link">Conectar</a>
        </article>
    );
};

export default NextEvent;