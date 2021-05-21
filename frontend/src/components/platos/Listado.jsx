import React, { useState } from 'react';
import Editar from './Editar';
import Plato from './Plato';

import * as fetchPlatos from '../../helper/fetchPlatos';

const Listado = ({ platos, eliminar, setPlatos }) => {
  //initial state
  const plato_edit_initial = {
    nombre: '',
    descripcion: '',
    precio: ''
  };

  //state
  const [plato_edit, set_plato_edit] = useState(plato_edit_initial);

  //handleChange
  const handleEditarChange = (e) => {
    set_plato_edit({
      ...plato_edit,
      [e.target.name]: e.target.value
    });
  };

  const abrirEditar = (id) => {
    const plato = platos.filter((plato) => plato.id_plato === id);
    set_plato_edit(...plato);
  };

  const editar = async (id) => {
    try {
      //TODO: validacion de campos

      //TODO: mostrar error en caso que exista
      await fetchPlatos.editar(plato_edit);
      setPlatos(
        platos.map((item) => (item.id_plato === id ? plato_edit : item))
      );

      //TODO: Cerrar el modal
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h3 className="text-secondary">Listado de platos</h3>

      <table className="table table-striped text-secondary">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!platos.length ? (
            <tr>
              <td colSpan="5" className="text-center">
                No hay platos aún.
              </td>
            </tr>
          ) : (
            platos.map((plato) => (
              <tr key={plato.id_plato}>
                <Plato
                  plato={plato}
                  eliminar={eliminar}
                  abrirEditar={abrirEditar}
                />
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal para editar */}
      <Editar
        id="myModal"
        className="modal fade"
        role="dialog"
        plato_edit={plato_edit}
        editar={editar}
        set_plato_edit={set_plato_edit}
        handleEditarChange={handleEditarChange}
      />
    </>
  );
};

export default Listado;
