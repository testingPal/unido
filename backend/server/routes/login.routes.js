import { seleccionarPorNombreU } from '../controllers/login.controller';
import { validarBody } from '../middlewares/validaciones';
import { loginSchema } from '../validators/login.validator';

export default (app) => {
  app.post('/login', validarBody(loginSchema), seleccionarPorNombreU);
};
