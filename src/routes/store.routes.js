import { Router } from "express";
import { addStore, getAllStores } from "../controllers/store.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.use(verifyJWT);

router
  .route("/add")
  .post(upload.fields([{ name: "image", maxCount: "3" }]), addStore);
router.route("/").get(getAllStores);

export default router;
