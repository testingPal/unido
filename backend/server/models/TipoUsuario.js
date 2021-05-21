import { pool, promisePool } from '../config/db';

export const seleccionar = async (id) => {
  try {
    const query = `SELECT * from TipoUsuario WHERE id_tipo_usuario=${id}`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};
