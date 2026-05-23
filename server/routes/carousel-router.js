import express from "express";
import { auth, authAdmin } from "../middlewares/user-middleware.js";
import upload from "../middlewares/multer-middleware.js";
import {
  createCarouselImage,
  deleteCarouselImage,
  getCarouselImages,
} from "../controllers/carousel-controller.js";

const router = express.Router();

router.get("/", getCarouselImages);
router.post("/", auth, authAdmin, upload.single("image"), createCarouselImage);
router.delete("/:id", auth, authAdmin, deleteCarouselImage);

export default router;
