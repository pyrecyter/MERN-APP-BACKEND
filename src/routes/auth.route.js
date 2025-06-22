import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import {
  userLoginValidator,
  userPasswordChangeValidator,
} from "../validators/auth.validator.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/login", validate(userLoginValidator), authController.loginUser);
router.get("/me", auth, authController.getCurrentUser);
router.post(
  "/change-password",
  auth,
  validate(userPasswordChangeValidator),
  authController.changePassword
);

export default router;
