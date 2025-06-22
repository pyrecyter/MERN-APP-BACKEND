import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import {
  userCreationValidator,
  userUpdateValidator,
} from "../validators/user.validator.js";
import uuidParamValidate from "../middlewares/uuidParamValidator.js";

const router = Router();

router.get("/", userController.getUsers);
router.post("/", validate(userCreationValidator), userController.createUser);
router.get("/:id", uuidParamValidate, userController.getUser);
router.patch(
  "/:id",
  uuidParamValidate,
  validate(userUpdateValidator),
  userController.updateUser
);
router.delete("/:id", uuidParamValidate, userController.deleteUser);

export default router;
