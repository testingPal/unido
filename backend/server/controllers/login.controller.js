import * as Usuario from '../models/Login';
const jwt = require('jsonwebtoken');
require('dotenv').config();

export const seleccionarPorNombreU = async (req, res) => {
  let { nombre_usuario, contrasenia } = res.locals.bodyValidado;

  try {
    const data = await Usuario.seleccionarPorNombreU(nombre_usuario);

    /*los array vacios cuentan como valores verdaderos asi que lo evaluo asi para que sirva la comprobacion
    en vez de usar !data como haria normalmente*/
    if (data == false) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Credenciales invalidas' }] });
    }

    let pass = data[0].contrasenia;

    if (pass != contrasenia) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Credenciales invalidas' }] });
    }

    console.log(data[0]);

    const payload = {
      usuario: {
        id_usuario: data[0].id_usuario,
        id_empleado: data[0].id_empleado,
        id_tipo_usuario: data[0].id_empleado,
        nombre_tipo_usuario: data[0].nombre_tipo_usuario
      }
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: 'Token generado',
          data: { token, nombre_tipo_usuario: data[0].nombre_tipo_usuario }
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Comuniquese con el administrador' });
  }
};
