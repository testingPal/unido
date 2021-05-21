import React from 'react';

//TODO: podria cambiarse a un modal para que pida confirmacion antes de eliminar
const Eliminar = ({ eliminar, id_plato }) => {
  return (
    <>
      <input
        type="submit"
        className="btn btn-danger"
        value="Eliminar"
        onClick={() => eliminar(id_plato)}
      ></input>
    </>
  );
};

export default Eliminar;
