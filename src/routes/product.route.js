import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import validate from "../middlewares/validate.js";
import {
  productQuantityValidator,
  productValidator,
} from "../validators/product.validator.js";
import uuidParamValidate from "../middlewares/uuidParamValidator.js";
import authorize from "../middlewares/authorize.js";
import { permissions } from "../config/permissions.js";

const router = Router();

router.get("/", productController.getProducts);
router.get("/:id", uuidParamValidate, productController.getProduct);
router.post(
  "/",
  authorize(permissions.manage_products),
  validate(productValidator),
  productController.addProduct
);
router.patch(
  "/:id",
  authorize(permissions.manage_products),
  uuidParamValidate,
  validate(productValidator),
  productController.editProduct
);
router.delete(
  "/:id",
  authorize(permissions.manage_products),
  uuidParamValidate,
  productController.deleteProduct
);
router.patch(
  "/:id/stock",
  authorize(permissions.adjust_inventory),
  uuidParamValidate,
  validate(productQuantityValidator),
  productController.updateProductQuantity
);

export default router;
