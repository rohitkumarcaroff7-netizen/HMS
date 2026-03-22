import express from "express";
import { auth, authAdmin } from "../middlewares/user-middleware.js";
import {
  getFoodNotice,
  upsertFoodNotice,
} from "../controllers/foodnotice-controller.js";

const router = express.Router();

router.get("/", getFoodNotice);
router.put("/", auth, authAdmin, upsertFoodNotice);

export default router;
