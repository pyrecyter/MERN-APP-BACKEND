import { Router } from "express";
import * as categoryController from "../controllers/category.controller.js";
import validate from "../middlewares/validate.js";
import { categoryValidator } from "../validators/category.validator.js";
import uuidParamValidate from "../middlewares/uuidParamValidator.js";
import authorize from "../middlewares/authorize.js";
import { permissions } from "../config/permissions.js";

const router = Router();

router.get("/", categoryController.getCategories);
router.get(
  "/:id",
  authorize(permissions.manage_categories),
  uuidParamValidate,
  categoryController.getCategory
);
router.post(
  "/",
  authorize(permissions.manage_categories),
  validate(categoryValidator),
  categoryController.addCategory
);
router.patch(
  "/:id",
  authorize(permissions.manage_categories),
  uuidParamValidate,
  validate(categoryValidator),
  categoryController.editCategory
);
router.delete(
  "/:id",
  authorize(permissions.manage_categories),
  uuidParamValidate,
  categoryController.deleteCategory
);

export default router;
