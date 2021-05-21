export const validarBody = (schema) => {
  return async (req, res, next) => {
    try {
      res.locals.bodyValidado = await schema.validateAsync(req.body, {
        abortEarly: false
      });
      next();
    } catch (err) {
      const { details } = err;
      const errorsDetail = details.map((i) => i.message);
      res.status(422).json({ msg: errorsDetail });
    }
  };
};

export const validarQuery = (schema) => {
  return async (req, res, next) => {
    try {
      res.locals.queryValidado = await schema.validateAsync(req.query, {
        abortEarly: false
      });
      next();
    } catch (err) {
      const { details } = err;
      const errorsDetail = details.map((i) => i.message);
      res.status(422).json({ msg: errorsDetail });
    }
  };
};

export const validarParams = (schema) => {
  return async (req, res, next) => {
    try {
      res.locals.paramsValidado = await schema.validateAsync(req.params);
      next();
    } catch (err) {
      const { details } = err;
      const errorsDetail = details.map((i) => i.message);
      res.status(422).json({ msg: errorsDetail });
    }
  };
};
