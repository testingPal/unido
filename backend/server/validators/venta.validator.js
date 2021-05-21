import Joi from 'joi';

export const ventaSchema = Joi.object({
  nombres: Joi.string().min(3),
  apellidos: Joi.string().min(3).required(),
  DetallesVenta: Joi.array()
    .items({
      id_plato: Joi.number().required(),
      cantidad: Joi.number().required()
    })
    .required()
});

ventaSchema.validate([4]);
