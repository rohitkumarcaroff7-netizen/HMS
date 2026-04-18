import express from "express";
import { auth, authAdmin } from "../middlewares/user-middleware.js";
import {
  getEligibleStudentList,
  upsertEligibleStudentList,
} from "../controllers/eligibleStudent-controller.js";

const router = express.Router();

router.get("/", getEligibleStudentList);
router.put("/", auth, authAdmin, upsertEligibleStudentList);

export default router;
