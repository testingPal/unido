import {
  actualizar,
  eliminar,
  insertar,
  seleccionar,
  seleccionarById
} from '../controllers/empleado.controller';

import { empleadoSchema } from '../validators/empleado.validator';
import { idSchema, intervaloSchema } from '../validators/query.validator';

import {
  validarBody,
  validarParams,
  validarQuery
} from '../middlewares/validaciones';

export default (app) => {
  app.get('/empleados/:id', validarParams(idSchema), seleccionarById);

  app.get('/empleados', validarQuery(intervaloSchema), seleccionar);

  app.post('/empleados', validarBody(empleadoSchema), insertar);

  app.put(
    '/empleados/:id',
    validarParams(idSchema),
    validarBody(empleadoSchema),
    actualizar
  );

  app.delete('/empleados/:id', validarParams(idSchema), eliminar);
};
