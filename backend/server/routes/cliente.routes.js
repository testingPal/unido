import {
  actualizar,
  eliminar,
  insertar,
  seleccionar,
  seleccionarById
} from '../controllers/cliente.controller';

import { clienteSchema } from '../validators/cliente.validator';
import { idSchema, intervaloSchema } from '../validators/query.validator';

import {
  validarBody,
  validarParams,
  validarQuery
} from '../middlewares/validaciones';

export default (app) => {
  app.get('/clientes/:id', validarParams(idSchema), seleccionarById);

  app.get('/clientes', validarQuery(intervaloSchema), seleccionar);

  app.post('/clientes', validarBody(clienteSchema), insertar);

  app.put(
    '/clientes/:id',
    validarParams(idSchema),
    validarBody(clienteSchema),
    actualizar
  );

  app.delete('/clientes/:id', validarParams(idSchema), eliminar);
};
