import { pool, promisePool } from '../config/db';

export const seleccionarPorNombreU = async (nombre_usuario) => {
  try {
    const query = `SELECT u.id_usuario, u.id_empleado, u.id_tipo_usuario, u.nombre_usuario, u.contrasenia, t.nombre_tipo_usuario FROM Usuario as u LEFT JOIN TipoUsuario as t ON u.id_tipo_usuario = t.id_tipo_usuario WHERE nombre_usuario = '${nombre_usuario}'`;

    const data = await promisePool.query(query);
    return data[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
};
