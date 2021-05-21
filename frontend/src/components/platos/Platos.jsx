import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Agregar from './Agregar';
import Listado from './Listado';
import * as fetchPlatos from '../../helper/fetchPlatos';
import { leerSesion } from '../../helper/autenticacion';
import { useHistory } from 'react-router';

const Platos = () => {
  //Initial states
  const platoInitial = {
    nombre: '',
    descripcion: '',
    precio: ''
  };

  //states
  const [platos, setPlatos] = useState([]);
  const [plato, setPlato] = useState(platoInitial);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState('Cargando...');

  //handleChange
  const handleAgregarChange = (e) => {
    setPlato({
      ...plato,
      [e.target.name]: e.target.value
    });
  };

  //Operaciones CRUD
  const eliminar = async (id) => {
    try {
      await fetchPlatos.eliminar(id);

      let platosActualizado = [...platos].filter(
        (plato) => plato.id_plato !== id
      );

      //TODO: actualizar con los valores del response para que muestre los decimales
      setPlatos(platosActualizado);
    } catch (err) {
      console.log(err);
    }
  };

  const obtener = async (token) => {
    try {
      const datos = await fetchPlatos.obtener(token);

      if (datos.data.length > 0) {
        setPlatos(datos.data);
      } else {
        setMensaje(datos.msg || 'No hay platos');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const insertar = async () => {
    //TODO: validacion de campos
    try {
      const datos = await fetchPlatos.insertar(plato);

      //TODO: mostrar error en caso que exista
      if (datos.data) {
        setError(false);
        setPlato(platoInitial);
        setPlatos([...platos, datos.data]);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const history = useHistory();

  useEffect(() => {
    //redireccionar al login si no es ADMIN
    const sesion = leerSesion();

    if (sesion.existe && sesion.cargo === 'ADMIN') {
      obtener(sesion.token);
    } else {
      history.push('/');
    }
  }, []);

  return (
    <>
      <div className="row mb-5">
        <Header />
      </div>
      <div className="row">
        <div className="col">
          <Agregar
            plato={plato}
            insertar={insertar}
            handleAgregarChange={handleAgregarChange}
          />
        </div>
        <div className="col-8">
          <Listado platos={platos} eliminar={eliminar} setPlatos={setPlatos} />
        </div>
      </div>

      {/* {!platos.length > 0 && <Error mensaje={mensaje} />} */}
    </>
  );
};

export default Platos;
