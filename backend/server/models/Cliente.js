import { pool, promisePool } from '../config/db';

export const seleccionarById = async (id) => {
  try {
    const query = `SELECT id_cliente, nombres, apellidos FROM Cliente WHERE id_cliente=${pool.escape(
      id
    )} AND estado = 1`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    throw err;
  }
};

export const seleccionar = async (desde, limite) => {
  try {
    const query = `SELECT id_cliente, nombres, apellidos FROM Cliente WHERE estado = 1 LIMIT ${pool.escape(
      limite
    )} OFFSET ${pool.escape(desde)}`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    throw err;
  }
};

export const insertar = async (nuevoCliente) => {
  try {
    const query = `INSERT INTO Cliente SET ?`;

    const data = await promisePool.query(query, nuevoCliente);
    return data;
  } catch (err) {
    throw err;
  }
};

export const actualizar = async (id, nuevoCliente) => {
  try {
    const query = `Update Cliente SET ? WHERE id_cliente=${pool.escape(
      id
    )} AND estado = 1`;
    const data = await promisePool.query(query, nuevoCliente);
    return data[0];
  } catch (err) {
    throw err;
  }
};

export const eliminar = async (id) => {
  try {
    const query = `UPDATE Cliente SET estado = 0 WHERE id_cliente = ${id}`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    throw err;
  }
};
