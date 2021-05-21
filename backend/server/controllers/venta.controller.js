import * as Venta from '../models/Venta';

export const insertar = async (req, res) => {
  let nuevaVenta = res.locals.bodyValidado;

  try {
    nuevaVenta = { ...nuevaVenta, id_usuario: res.locals.user.id_usuario };
    const data = await Venta.insertar(nuevaVenta);

    if (data[0].affectedRows === 1) {
      return res.json({
        msg: 'El registro ha sido insertado',
        data: { id: data[0].insertId, ...nuevaVenta, total: data[0].total }
      });
    }

    res.status(400).json({
      ok: false,
      msg: 'El registro no fue insertado'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Comuniquese con el administrador' });
  }
};

export const seleccionar = async (req, res) => {
  let { desde, limite } = res.locals.queryValidado;

  //Se resta uno porque inicia en la posicion cero, si no manda nada por defecto sera cero.
  desde = desde - 1 || 0;
  //si no manda nada el cliente, por defecto el limite seran diez registros
  limite = limite || 10;

  try {
    const data = await Venta.seleccionar(desde, limite);

    if (data[0]) {
      return res.json({
        msg: 'Registros obtenidos',
        data
      });
    }

    res.status(404).json({
      msg: 'No se encontraron registros',
      data
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Comuniquese con el administrador' });
  }
};

export const eliminar = async (req, res) => {
  const { id } = res.locals.paramsValidado;

  try {
    const data = await Venta.eliminar(id);

    if (data.affectedRows == 1 && data.changedRows == 1) {
      return res.json({ msg: `El registro con id: ${id} ha sido eliminado` });
    }

    res.status(404).json({ msg: `No se encontró registro con id: ${id}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Comuniquese con el administrador' });
  }
};
