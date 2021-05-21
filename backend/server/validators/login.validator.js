import Joi from 'joi';

export const loginSchema = Joi.object({
  nombre_usuario: Joi.string().min(3).required(),
  contrasenia: Joi.string().min(6).required()
});
