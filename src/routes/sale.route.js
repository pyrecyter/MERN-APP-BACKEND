import { Router } from "express";
import * as saleController from "../controllers/sale.controller.js";
import validate from "../middlewares/validate.js";
import { saleValidator } from "../validators/sale.validator.js";
import uuidParamValidate from "../middlewares/uuidParamValidator.js";

const router = Router();

router.get("/", saleController.getSales);
router.get("/:id", uuidParamValidate, saleController.getSale);
router.post("/", validate(saleValidator), saleController.addSale);
router.patch(
  "/:id",
  uuidParamValidate,
  validate(saleValidator),
  saleController.editSale
);
router.delete("/:id", uuidParamValidate, saleController.deleteSale);

export default router;
