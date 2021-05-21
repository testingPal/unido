import React from 'react';

const Agregar = ({ plato, insertar, handleAgregarChange }) => {
  return (
    <>
      <h3 className="text-secondary">Nuevo plato</h3>
      <form>
        <div className="form-group">
          <label className="form-label" htmlFor="nombre">
            Nombre:
          </label>
          <input
            id="nombre"
            name="nombre"
            value={plato.nombre}
            onChange={handleAgregarChange}
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="descripcion">
            Descripcion:
          </label>
          <input
            id="descripcion"
            name="descripcion"
            value={plato.descripcion}
            onChange={handleAgregarChange}
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="precio">
            Precio:
          </label>
          <input
            id="precio"
            name="precio"
            value={plato.precio}
            onChange={handleAgregarChange}
            type="number"
            className="form-control"
            required
          />
        </div>

        <input
          type="button"
          value="Agregar"
          className="btn btn-primary mt-3"
          onClick={insertar}
        />
      </form>
    </>
  );
};

export default Agregar;
