import Joi from 'joi';

export const usuarioSchema = Joi.object({
  id_empleado: Joi.number().positive().required(),
  id_tipo_usuario: Joi.number().positive().required(),
  nombre_usuario: Joi.string().min(3).required(),
  contrasenia: Joi.string().min(6).required()
});
