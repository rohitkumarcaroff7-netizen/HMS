import express from 'express'
import {requestForm} from "../controllers/request-controller.js"
const router =express.Router();

router.route("/requestform").post(requestForm);

export default router;