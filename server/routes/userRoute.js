import express from 'express'
import { register, login, forgot_password, reset_password, verifyOTP, getUserData, getAllStudents, updateRole, deleteUser, getMCAStudents, getMBAStudents, getMTECHStudents, getEligibleStudents } from '../controllers/userControl.js'
import {auth, authAdmin} from '../middlewares/user-middleware.js'
// import upload from '../config/multer.js'

const router = express.Router()

router.post('/signup', register)
router.post('/signin', login)
router.post('/forgot_password', forgot_password)
router.post('/reset_password', reset_password)
router.post('/verify_otp', verifyOTP)
router.get("/allUser", auth, getAllStudents)
router.get("/allMCA", getMCAStudents)
router.get("/allMBA", getMBAStudents)
router.get("/allMTECH", getMTECHStudents)
router.get("/eligible-students", getEligibleStudents)
router.put("/updateRole/:id", auth, authAdmin, updateRole)
router.delete("/deleteUser/:id", auth, authAdmin, deleteUser)
router.get('/getProfile/:id', auth, getUserData)
// router.put("/update_profile/:id", auth, upload.single("profileUrl"), updateProfile);


export default router;
