import express from "express";
import { auth, authAdmin } from "../middlewares/user-middleware.js";
import {
  getFeeStructure,
  updateFeeStructure,
} from "../controllers/feestructure-controller.js";

const router = express.Router();

router.get("/", getFeeStructure);
router.put("/", auth, authAdmin, updateFeeStructure);

export default router;
