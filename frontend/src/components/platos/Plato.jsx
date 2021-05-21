import React from 'react';
import Eliminar from './Eliminar';

const Plato = ({ plato, eliminar, abrirEditar }) => {
  return (
    <>
      <td>{plato.nombre}</td>
      <td>{plato.descripcion}</td>
      <td>{plato.precio}</td>
      <td colSpan="2">
        <button
          type="button"
          className="btn btn-success"
          data-toggle="modal"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
          onClick={() => abrirEditar(plato.id_plato)}
        >
          Editar
        </button>
        {' | '}
        <Eliminar eliminar={eliminar} id_plato={plato.id_plato} />
      </td>
    </>
  );
};

export default Plato;
