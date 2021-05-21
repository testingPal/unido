import { pool, promisePool } from '../config/db';

export const seleccionarById = async (id) => {
  try {
    const query = `SELECT e.id_empleado, e.nombres, e.apellidos, e.fotografia, e.telefono, e.sexo FROM Empleado AS e WHERE e.estado = 1 AND e.id_empleado = ${id}`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    throw err;
  }
};

export const seleccionar = async (desde, limite) => {
  try {
    const query = `SELECT e.id_empleado, e.nombres, e.apellidos, e.fotografia, e.telefono, e.sexo FROM Empleado AS e WHERE e.estado = 1 LIMIT ${pool.escape(
      limite
    )} OFFSET ${pool.escape(desde)}`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    throw err;
  }
};

export const insertar = async (nuevoEmpleado) => {
  try {
    const query = `INSERT INTO Empleado SET ?`;

    const data = await promisePool.query(query, nuevoEmpleado);
    return data;
  } catch (err) {
    throw err;
  }
};

export const actualizar = async (id, nuevoEmpleado) => {
  try {
    const query = `Update Empleado SET ? WHERE id_empleado = ${pool.escape(
      id
    )} AND estado = 1`;
    const data = await promisePool.query(query, nuevoEmpleado);
    return data[0];
  } catch (err) {
    throw err;
  }
};

export const eliminar = async (id) => {
  try {
    const query = `UPDATE Empleado SET estado = 0 WHERE id_empleado = ${id}`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    throw err;
  }
};
