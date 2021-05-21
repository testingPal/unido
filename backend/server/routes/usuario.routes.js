import {
  actualizar,
  eliminar,
  insertar,
  seleccionar,
  seleccionarById
} from '../controllers/usuario.controller';

import { usuarioSchema } from '../validators/usuario.validator';
import { idSchema, intervaloSchema } from '../validators/query.validator';

import {
  validarBody,
  validarParams,
  validarQuery
} from '../middlewares/validaciones';

export default (app) => {
  app.get('/usuarios/:id', validarParams(idSchema), seleccionarById);

  app.get('/usuarios', validarQuery(intervaloSchema), seleccionar);

  app.post('/usuarios', validarBody(usuarioSchema), insertar);

  app.put(
    '/usuarios/:id',
    validarParams(idSchema),
    validarBody(usuarioSchema),
    actualizar
  );

  app.delete('/usuarios/:id', validarParams(idSchema), eliminar);
};
