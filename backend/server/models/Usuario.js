import { pool, promisePool } from '../config/db';

export const seleccionarById = async (id) => {
  try {
    const query = `SELECT u.id_usuario, u.nombre_usuario, e.nombres, e.apellidos FROM Usuario as u INNER JOIN Empleado as e ON u.id_empleado = e.id_empleado WHERE id_usuario=${pool.escape(
      id
    )} AND e.estado = 1`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const seleccionar = async (desde, limite) => {
  try {
    const query = `SELECT u.id_usuario, u.nombre_usuario, e.nombres, e.apellidos FROM Usuario as u INNER JOIN Empleado as e ON u.id_empleado = e.id_empleado WHERE e.estado = 1 LIMIT ${pool.escape(
      limite
    )} OFFSET ${pool.escape(desde)}`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//TODO: validar que exista el empleado y el tipoUsuario
//TODO: retornar valores significativos en vez del id
export const insertar = async (nuevoUsuario) => {
  try {
    const query = `INSERT INTO Usuario SET ?`;

    const data = await promisePool.query(query, nuevoUsuario);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//TODO: validar que exista el empleado y el tipoUsuario
export const actualizar = async (id, nuevoUsuario) => {
  try {
    const query = `Update Usuario SET ? WHERE id_usuario=${pool.escape(
      id
    )} AND estado = 1`;
    const data = await promisePool.query(query, nuevoUsuario);
    return data[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const eliminar = async (id) => {
  try {
    const query = `UPDATE Usuario SET estado = 0 WHERE id_usuario = ${id}`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};
