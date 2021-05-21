import { pool, promisePool } from '../config/db';

export const insertar = async (venta) => {
  try {
    //Creando el objeto cliente con sus respectivos valores
    let nuevoCliente = {
      nombres: venta.nombres,
      apellidos: venta.apellidos
    };

    //insertar el cliente y obtener el id
    const queryCliente = `INSERT INTO Cliente SET ?`;
    const dataCliente = await promisePool.query(queryCliente, nuevoCliente);

    let id_cliente = dataCliente[0].insertId;

    //obtener el id del cajero
    //TODO: debe ser obtenido desde la autenticacion

    let id_usuario = venta.id_usuario;

    //Creando el objeto venta con sus respectivos valores
    let nuevaVenta = { id_usuario, id_cliente, total: 0 };

    //insertar los datos a la tabla Venta;
    const queryVenta = `INSERT INTO Venta SET ?`;
    const dataVenta = await promisePool.query(queryVenta, nuevaVenta);

    //obtener el id de la fila venta insertada
    let id_venta = dataVenta[0].insertId;

    //Para insertar multiples filas se debe usar un array anidado, por ello se convierte
    let arrayPlatos = [];
    venta.DetallesVenta.forEach((item) => {
      arrayPlatos.push([id_venta, ...Object.values(item)]);
    });

    //insertar todas las posibles filas a la tabla detalleVenta
    let queryDetalle = `insert into DetallesVenta (id_venta, id_plato, cantidad) values ?`;
    const dataDetalle = await promisePool.query(queryDetalle, [arrayPlatos]);

    //generar el total de la venta
    let total = 0;

    let queryPlato = `SELECT d.cantidad, p.precio FROM DetallesVenta as d INNER JOIN Plato as p ON d.id_plato = p.id_plato WHERE d.id_venta =${id_venta}`;

    let dataTotal = await promisePool.query(queryPlato);

    dataTotal[0].forEach((element) => {
      let item = { ...element };
      let subtotal = item.cantidad * item.precio;
      total += subtotal;
    });

    dataVenta[0].total = total;
    return dataVenta;
  } catch (err) {
    throw err;
  }
};

export const seleccionar = async (desde, limite) => {
  try {
    const ventaQuery = `SELECT v.id_venta, c.nombres, c.apellidos, v.fecha FROM Venta AS v INNER JOIN Usuario AS u ON v.id_usuario = u.id_usuario LEFT JOIN Cliente AS c ON v.id_cliente = c.id_cliente WHERE v.estado = 1`;
    const dataVenta = await promisePool.query(ventaQuery);

    const queryDetalle = `SELECT d.id_venta, d.id_detalle_venta, d.cantidad, p.nombre FROM DetallesVenta AS d LEFT JOIN Plato AS p ON d.id_plato = p.id_plato WHERE d.estado = 1`;
    const dataDetalle = await promisePool.query(queryDetalle);

    for (let venta of dataVenta[0]) {
      venta.detalles = [];
      for (let detalle of dataDetalle[0]) {
        if (venta.id_venta == detalle.id_venta) {
          venta.detalles.push(detalle);
        }
      }
    }

    return dataVenta[0];
  } catch (err) {
    throw err;
  }
};

export const eliminar = async (id) => {
  try {
    //Eliminar de la tabla Venta
    const query = `UPDATE Venta SET estado = 0 WHERE id_venta = ${id}`;
    const data = await promisePool.query(query);

    //Eliminar de la tabla DetallesVenta
    const query2 = `UPDATE DetallesVenta SET estado = 0 WHERE id_venta = ${id}`;
    const data2 = await promisePool.query(query2);

    //Retornando la data
    return data[0];
  } catch (err) {
    throw err;
  }
};
