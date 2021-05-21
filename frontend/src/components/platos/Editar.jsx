import React from 'react';

const Editar = ({ plato_edit, editar, handleEditarChange }) => {
  return (
    <>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Editar Plato
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="form_editar">
                <div className="mb-3">
                  <label htmlFor="nombre" className="col-form-label">
                    Nombre:
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    value={plato_edit.nombre}
                    onChange={handleEditarChange}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="col-form-label">
                    Descripción:
                  </label>
                  <input
                    id="descripcion"
                    name="descripcion"
                    value={plato_edit.descripcion}
                    onChange={handleEditarChange}
                    className="form-control"
                    type="text"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="precio" className="col-form-label">
                    Precio:
                  </label>
                  <input
                    id="precio"
                    name="precio"
                    value={plato_edit.precio}
                    onChange={handleEditarChange}
                    type="number"
                    className="form-control"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <input
                type="button"
                className="btn btn-primary"
                value="Actualizar"
                onClick={() => editar(plato_edit.id_plato)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editar;
