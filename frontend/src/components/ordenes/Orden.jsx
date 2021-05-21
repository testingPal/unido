import React from 'react';
import Detalles from './Detalles';

const Orden = ({ orden, eliminar }) => {
  return (
    <ul className="list-group mb-5 col-md-4 text-capitalize">
      <li className="list-group-item list-group-item-primary text-center">
        {orden.nombres} {orden.apellidos}
      </li>
      <Detalles detalles={orden.detalles} />
      <input
        type="submit"
        className="btn btn-outline-secondary"
        value="Orden Completada"
        onClick={() => eliminar(orden.id_venta)}
      ></input>
    </ul>
  );
};

export default Orden;
