const validateQuery = (schema) => async (req, res, next) => {
  try {
    await schema.validate({ ...req.query }, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({
      errors: err.errors,
    });
  }
};

export default validateQuery;
