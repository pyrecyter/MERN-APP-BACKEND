import { Router } from "express";
import * as categoryController from "../controllers/category.controller.js";
import validate from "../middlewares/validate.js";
import { categoryValidator } from "../validators/category.validator.js";
import uuidParamValidate from "../middlewares/uuidParamValidator.js";

const router = Router();

router.get("/", categoryController.getCategories);
router.get("/:id", uuidParamValidate, categoryController.getCategory);
router.post("/", validate(categoryValidator), categoryController.addCategory);
router.patch(
  "/:id",
  uuidParamValidate,
  validate(categoryValidator),
  categoryController.editCategory
);
router.delete("/:id", uuidParamValidate, categoryController.deleteCategory);

export default router;
