import React from "react";
import "./TableEventosAluno.css";

import comentaryIcon from "../../../assets/images/images/comentary-icon.svg";
import trashDelete from "../../../assets/images/images/trash-delete.svg";
import ToggleSwitch from "../../../components/ToggleSwitch/ToggleSwitch";
// importa a biblioteca de tootips ()
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const TableEventosAluno = ({ dados, fnConnect = null, fnShowModal = null }) => {
  return (
      <table className="tbal-data">
        <thead className="tbal-data__head">
          <tr className="tbal-data__head-row tbal-data__head-row--red-color">
            <th className="tbal-data__head-title tbal-data__head-title--big"> Evento </th>
            <th className="tbal-data__head-title tbal-data__head-title--big"> Data </th>
            <th className="tbal-data__head-title tbal-data__head-title--big"> Ações </th>
          </tr>
        </thead>

        <tbody>
          {dados.map((e) => {
            return (
              <tr className="tbal-data__head-row" key={Math.random()}>
                <td className="tbal-data__data tbal-data__data--big">
                  {e.nomeEvento}
                </td>
  
                <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                  {e.dataEvento}
                </td>
  
                <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                  <img
                    className="tbal-data__icon"
                    idevento={e.idEvento}
                    src={comentaryIcon}
                    alt=""
                    onClick={fnShowModal}
                  />
  
                  <ToggleSwitch toggleActive={e.situacao} manipulationFunction={ () => {
                    fnConnect(
                      e.idEvento, 
                      e.situacao ? "unconnect" : "connect",
                      e.idPresencaEvento //parametro opcional
                      )
                    } } />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
};

export default TableEventosAluno;
