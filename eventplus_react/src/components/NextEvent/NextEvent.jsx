import React from "react";
import "./NextEvent.css";

import { dateFormatDbToView } from "../../Utils/StringFunction";
import { Tooltip } from "react-tooltip";

const NextEvent = ({ title, description, eventDate, idEvent }) => {
  function conectar(idEvent) {
    alert(`Conectar ao evento: ${idEvent}`);
  }

  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>
      <p
        className="event-card__description"
        data-tooltip-id={idEvent}
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvent} className="tooltip" />
        {description.substr(0.16)}...
      </p>
      <p
        className="event-card__description"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id="my-tooltip" />
        {dateFormatDbToView(eventDate)}
      </p>
      <a
        onClick={() => {
          conectar(idEvent);
        }}
        href=""
        className="event-card__connect-link"
      >
        Conectar
      </a>
    </article>
  );
};

export default NextEvent;
