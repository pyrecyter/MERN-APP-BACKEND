import { uuidValidator } from "../validators/uuid.validator.js";

const uuidParamValidate = async (req, res, next) => {
  try {
    await uuidValidator.validate({ ...req.params }, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({
      errors: err.errors,
    });
  }
};

export default uuidParamValidate;
