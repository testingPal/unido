import Joi from 'joi';

export const clienteSchema = Joi.object({
  nombres: Joi.string().min(3),
  apellidos: Joi.string().min(3).required()
});
