import React from "react";
import "./TableTu.css";

import editPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";

const TableTu = ({ dados, fnDelete = null, fnUpdate = null }) => {
  return (
    <table className="table-data">
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Título
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Deletar
          </th>
        </tr>
      </thead>

      <tbody>
        {dados.map((tu) => {
          return (
            <tr className="table-data__head-row" key={tu.idTipUsuario}>
              <td className="table-data__data table-data__data--big">
                {tu.titulo}
              </td>

              <td className="table-data__data table-data__data--little">
                <img className="table-data__icon" 
                    src={editPen} alt="" 
                    onClick={() => {
                      fnUpdate(tu.idTipoUsuario)
                    }}
                />
              </td>

              <td className="table-data__data table-data__data--little">
                <img 
                     className="table-data__icon" 
                     src={trashDelete} alt="" 
                     onClick={() => {
                      fnDelete(tu.idTipoUsuario)}} 
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableTu;
