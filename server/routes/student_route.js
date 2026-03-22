import express from 'express'
import { getUserData } from '../controllers/userControl.js';
const router =express.Router();

router.get("/students",getUserData);

export default router;