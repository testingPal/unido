import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { leerSesion } from '../../helper/autenticacion';
import Error from '../Error';
import Header from '../Header';
import Orden from './Orden';

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [mensaje, setMensaje] = useState('Cargando...');

  const obtenerOrdenes = async (token) => {
    const res = await fetch('http://127.0.0.1:8080/ventas', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': token
      }
    });
    const data = await res.json();

    setOrdenes(data.data);

    if (!data.data.length > 0) {
      setMensaje('No hay ordenes');
    }
  };

  const history = useHistory();

  useEffect(() => {
    //redireccionar al login si no es CHEF
    const sesion = leerSesion();

    if (sesion.existe && sesion.cargo === 'CHEF') {
      
      obtenerOrdenes(sesion.token);
    } else {
      history.push('/');
    }
  }, []);

  const eliminar = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8080/ventas/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });

      let ordenesActualizadas = [...ordenes].filter(
        (orden) => orden.id_venta !== id
      );
      setOrdenes(ordenesActualizadas);

      //En caso que se eliminen todas las ordenes se mostrara este mensaje
      if (!ordenesActualizadas.length > 0) setMensaje('No hay ordenes');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <Header />
      <div className="row">
        <h1 className="col mb-4 mt-4 text-secondary">
          Listado de ordenes
        </h1>
      </div>
      {ordenes.length > 0 && (
        <div className="row">
          {ordenes.map((orden) => (
            <Orden key={orden.id_venta} orden={orden} eliminar={eliminar} />
          ))}
        </div>
      )}
      {!ordenes.length > 0 && <Error mensaje={mensaje} />}
    </>
  );
};

export default Ordenes;
