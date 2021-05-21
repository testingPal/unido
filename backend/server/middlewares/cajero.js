const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  //token
  const token = req.header('x-auth-token');

  //si no hay token se finaliza ejecucion
  if (!token) {
    return res.status(401).json({ msg: 'No hay token en la petición' });
  }

  try {
    //se decodifica el token
    const decoded = jwt.verify(token, process.env.jwtSecret);

    const cargo = decoded.usuario.nombre_tipo_usuario;

    console.log(decoded);

    //si el cargo en el token no es CAJERO se deniega acceso a esta ruta
    if (cargo != 'CAJERO') {
      return res.status(401).json({ msg: 'acceso denegado' });
    }

    res.locals.user = decoded.usuario;
    //se pasa al siguiente middleware
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: 'Token no valido' });
  }
};
