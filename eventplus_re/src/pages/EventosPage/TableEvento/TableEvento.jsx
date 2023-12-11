import React from 'react';
import './TableEvento.css';
import { dateFormatDbToView } from '../../../Utils/stringFunctions';
import edtPen from '../../../assets/images/images/edit-pen.svg';
import trashDelete from '../../../assets/images/images/trash-delete.svg';

const TableEvento = ({dados, fnDelete = null, fnUpdate = null}) => {
    return (
        <table className='table-data'>
            {/* CABEÇALHO */}
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">Nome</th>
                    <th className="table-data__head-title table-data__head-title--big">Descrição</th>
                    <th className="table-data__head-title table-data__head-title--big">Tipo de Evento</th>
                    <th className="table-data__head-title table-data__head-title--big">Instituição</th>
                    <th className="table-data__head-title table-data__head-title--big">Data</th>
                    <th className="table-data__head-title table-data__head-title--little">Editar</th>
                    <th className="table-data__head-title table-data__head-title--little">Deletar</th>
                </tr>
            </thead>

            {/* CORPO */}
            <tbody>
                {dados.map((ev) => {
                    return (
                        <tr className="table-data__head-row" key={ev.idEvento}>
                            <td className="table-data__data table-data__data--big">
                                {ev.nomeEvento}
                            </td>

                            <td className="table-data__data table-data__data--big">
                                {ev.descricao}
                            </td>

                            <td className="table-data__data table-data__data--big">
                                {ev.tiposEvento.titulo}
                            </td>

                            <td className="table-data__data table-data__data--big">
                                {ev.instituicao.nomeFantasia}
                            </td>

                            <td className="table-data__data table-data__data--big">
                                {dateFormatDbToView(ev.dataEvento)}
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img 
                                    className="table-data__icon" alt="Ícone em forma de caneta que edita o tipo de evento" 
                                    idevento={ev.idEvento}
                                    src={edtPen}  
                                    onClick={(e) => {fnUpdate(ev.idEvento)}} 
                                />
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img
                                    className="table-data__icon" alt="Ícone em forma de lata de lixo que exclui o  de evento" 
                                    idevento={ev.idEvento}
                                    src={trashDelete} 
                                    onClick={(e) => {fnDelete(ev.idEvento)}} 
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableEvento;