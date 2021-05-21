import Joi from 'joi';

export const platoSchema = Joi.object({
  nombre: Joi.string().min(3).required(),
  precio: Joi.number().positive().required(),
  descripcion: Joi.string().min(3).required(),
  imagen: Joi.string()
});
