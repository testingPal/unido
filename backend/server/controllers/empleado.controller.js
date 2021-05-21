import * as Empleado from '../models/Empleado';

export const seleccionarById = async (req, res) => {
  const { id } = res.locals.paramsValidado;

  try {
    const data = await Empleado.seleccionarById(id);

    if (data.length > 0) {
      return res.json({ msg: 'Registro obtenido', data: data[0] });
    }

    res.status(404).json({
      msg: `No se encontraron registros con el id: "${id}"`
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
    const data = await Empleado.seleccionar(desde, limite);

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
    res.status(500).json({ msg: 'Comuniquese con el adminitrador' });
  }
};

//TODO: validar que el id_cargo exista
export const insertar = async (req, res) => {
  const nuevoEmpleado = res.locals.bodyValidado;

  try {
    const data = await Empleado.insertar(nuevoEmpleado);

    if (data[0].affectedRows === 1) {
      return res.json({
        msg: 'El registro ha sido insertado',
        data: { id: data[0].insertId, ...nuevoEmpleado }
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

//TODO: validar que el id_cargo exista
export const actualizar = async (req, res) => {
  const { id } = res.locals.paramsValidado;
  const nuevoEmpleado = res.locals.bodyValidado;

  try {
    const data = await Empleado.actualizar(id, nuevoEmpleado);

    if (data.affectedRows == 1 && data.changedRows == 1) {
      return res.json({
        msg: 'El registro ha sido actualizado',
        data: { id, ...nuevoEmpleado }
      });
    }

    if (data.affectedRows == 1 && data.changedRows == 0) {
      return res.json({
        msg: 'El registro enviado es igual que el existente',
        data: { id, ...nuevoEmpleado }
      });
    }

    res.status(404).json({
      msg: `No se encontró registro con id: ${id}`
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Comuniquese con el administrador' });
  }
};

export const eliminar = async (req, res) => {
  const { id } = res.locals.paramsValidado;

  try {
    const data = await Empleado.eliminar(id);

    if (data.affectedRows == 1 && data.changedRows == 1) {
      return res.json({ msg: `El registro con id: ${id} ha sido eliminado` });
    }

    res.status(404).json({ msg: `No se encontró registro con id: ${id}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Comuniquese con el administrador' });
  }
};
