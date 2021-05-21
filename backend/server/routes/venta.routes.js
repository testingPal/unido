import {
  // actualizar,
  seleccionar,
  insertar,
  eliminar
  // seleccionarById
} from '../controllers/venta.controller';

import { ventaSchema } from '../validators/venta.validator';
import { idSchema, intervaloSchema } from '../validators/query.validator';
import cajero from '../middlewares/cajero';
import chef from '../middlewares/chef';

import {
  validarBody,
  validarParams,
  validarQuery
} from '../middlewares/validaciones';

export default (app) => {
  // app.get('/ventas/:id', validarParams(idSchema), seleccionarById);

  app.get('/ventas', validarQuery(intervaloSchema), chef, seleccionar);

  app.post('/ventas', validarBody(ventaSchema), cajero, insertar);

  // app.put(
  //   '/ventas/:id',
  //   validarParams(idSchema),
  //   validarBody(ventaSchema),
  //   actualizar
  // );

  app.delete('/ventas/:id', validarParams(idSchema), eliminar);
};
