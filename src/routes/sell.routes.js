import { Router } from "express";
import {
  addSells,
  getSellsData,
  getTotalSellsAmount,
  getMonthlySells,
} from "../controllers/sell.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT);

router.route("/add").post(addSells);
router.route("/").get(getSellsData);
router.route("/total").get(getTotalSellsAmount);
router.route("/monthlysell").get(getMonthlySells);

export default router;
