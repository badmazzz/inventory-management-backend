import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  searchProduct,
} from "../controllers/product.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT);

router.route("/add").post(addProduct);
router.route("/").get(getAllProducts);
router.route("/:productId").delete(deleteProduct).patch(updateProduct);
router.route("/search").get(searchProduct);

export default router;
