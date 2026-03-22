import express from 'express'
import {complainForm} from "../controllers/complain_controller.js"
const router =express.Router();

router.route("/complainform").post(complainForm);

export default router;