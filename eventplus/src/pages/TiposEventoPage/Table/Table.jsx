import React from 'react';
import './Table.css';

import TrashImage from '../../../assets/images/trash-delete.svg';
import PenImage from '../../../assets/images/edit-pen.svg';

const Table = ( {data, deleteFn = null, updateFn = null} ) => {
    return (
        <table className='table-data' id='table'>
             <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">Título</th>
                    <th className="table-data__head-title table-data__head-title--little">Editar</th>
                    <th className="table-data__head-title table-data__head-title--little">Deletar</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(element => {
                        return (
                            <tr key={element.idTipoEvento} className="table-data__head-row">
                                <td className="table-data__data table-data__data--big">
                                    { element.titulo }
                                </td>

                                <td className="table-data__data table-data__data--little">
                                    <img 
                                        onClick={() => updateFn(element.idTipoEvento, element.titulo)} 
                                        className="table-data__icon" 
                                        src={PenImage} alt="" 
                                        id-tipo-evento={element.idTipoEvento}
                                    />
                                </td>

                                <td className="table-data__data table-data__data--little">
                                    <img 
                                        onClick={() => deleteFn(element.idTipoEvento)} 
                                        className="table-data__icon" 
                                        src={TrashImage} alt="" 
                                    />
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
};

export default Table;