import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//Rutas
import EmpleadoRoutes from '../routes/empleado.routes';
import UsuarioRoutes from '../routes/usuario.routes';
import ClienteRoutes from '../routes/cliente.routes';
import PlatoRoutes from '../routes/plato.routes';
import VentaRoutes from '../routes/venta.routes';
import LoginRoutes from '../routes/login.routes';

export class Server {
  constructor() {
    this.port = parseInt(process.env.PORT) || 8080;
    this.app = express();

    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }

  middlewares() {
    this.app.use(cors({ origin: 'http://localhost:3000' }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
  }

  routes() {
    EmpleadoRoutes(this.app);
    UsuarioRoutes(this.app);
    ClienteRoutes(this.app);
    PlatoRoutes(this.app);
    VentaRoutes(this.app);
    LoginRoutes(this.app);
  }
}
