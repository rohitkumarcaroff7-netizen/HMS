import express from "express";
import { auth, authAdmin } from "../middlewares/user-middleware.js";
import {
  getFoodMenu,
  updateFoodMenu,
} from "../controllers/foodmenu-controller.js";

const router = express.Router();

router.get("/", getFoodMenu);
router.put("/", auth, authAdmin, updateFoodMenu);

export default router;
