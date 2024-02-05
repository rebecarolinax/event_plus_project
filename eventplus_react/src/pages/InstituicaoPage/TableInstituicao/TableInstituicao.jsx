import React from 'react';
import './TableInstituicao.css';
import edtPen from '../../../assets/images/images/edit-pen.svg';
import trashDelete from '../../../assets/images/images/trash-delete.svg';

const TableInstituicao = ({dados, fnDelete = null, fnUpdate = null}) => {
    return (
        <table className='table-data'>
            {/* CABEÇALHO */}
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">Nome da Instituição</th>
                    <th className="table-data__head-title table-data__head-title--big">Endereço</th>
                    <th className="table-data__head-title table-data__head-title--little">Editar</th>
                    <th className="table-data__head-title table-data__head-title--little">Deletar</th>
                </tr>
            </thead>
            
            {/* CORPO */}
            <tbody>
                {dados.map((tp) => {
                    return (
                        <tr className="table-data__head-row" key={tp.idInstituicao}>
                            <td className="table-data__data table-data__data--big">
                                {tp.nomeFantasia}
                            </td>

                            <td className="table-data__data table-data__data--big">
                                {tp.endereco}
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img 
                                    className="table-data__icon" alt="Ícone em forma de caneta que edita o tipo de evento" 
                                    idinstituicao={tp.idInstituicao}
                                    src={edtPen}  
                                    onClick={(e) => {fnUpdate(tp.idInstituicao)}} 
                                />
                            </td>

                            <td className="table-data__data table-data__data--little">
                                <img
                                    className="table-data__icon" alt="Ícone em forma de lata de lixo que exclui o tipo de evento" 
                                    idinstituicao={tp.idInstituicao}
                                    src={trashDelete} 
                                    onClick={(e) => {fnDelete(tp.idInstituicao)}} 
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableInstituicao;