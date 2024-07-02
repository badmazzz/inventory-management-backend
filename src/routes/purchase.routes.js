import { Router } from "express";
import {
  addPurchase,
  getPurchaseById,
  getAllPurchase,
  deletePurchase,
  updatePurchase,
  getTotalPurchaseAmount,
} from "../controllers/purchase.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllPurchase);
router.route("/purchaseamount").get(getTotalPurchaseAmount);
router.route("/add").post(addPurchase);
router
  .route("/:purchaseId")
  .get(getPurchaseById)
  .delete(deletePurchase)
  .patch(updatePurchase);

export default router;
