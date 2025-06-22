import { Router } from "express";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";
import categoryRoute from "./category.route.js";
import saleRoute from "./sale.route.js";
import productRoute from "./product.route.js";
import auth from "../middlewares/auth.js";
import authorize from "../middlewares/authorize.js";
import { permissions } from "../config/permissions.js";

const router = Router();

router.use("/users", auth, authorize(permissions.manage_users), userRoutes);
router.use("/auth", authRoutes);
router.use(
  "/categories",
  auth,
  authorize(permissions.manage_categories),
  categoryRoute
);
router.use("/products", auth, productRoute);
router.use("/sale", auth, saleRoute);

export default router;
