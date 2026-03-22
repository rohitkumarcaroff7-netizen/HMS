import express from "express";
import { auth, authAdmin } from "../middlewares/user-middleware.js";
import {
  createEvent,
  deleteEvent,
  getEvents,
} from "../controllers/event-controller.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", auth, authAdmin, createEvent);
router.delete("/:id", auth, authAdmin, deleteEvent);

export default router;
