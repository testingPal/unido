import Joi from 'joi';

//TODO: revisar validaciones fotografia
export const empleadoSchema = Joi.object({
  nombres: Joi.string().min(3).required(),
  apellidos: Joi.string().min(3).required(),
  fotografia: Joi.string(),
  telefono: Joi.number().positive().required(),
  sexo: Joi.string().length(1).required()
});
