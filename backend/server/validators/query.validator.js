const Joi = require('joi');

export const idSchema = Joi.object({
  id: Joi.number().positive()
});

export const intervaloSchema = Joi.object({
  desde: Joi.number().positive(),
  limite: Joi.number().positive()
});
