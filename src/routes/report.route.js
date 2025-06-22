import { Router } from "express";
import * as reportController from "../controllers/report.controller.js";
import validateQuery from "../middlewares/validateQuery.js";
import { reportValidator } from "../validators/report.validator.js";

const router = Router();

router.get("/", validateQuery(reportValidator), reportController.getReports);

export default router;
