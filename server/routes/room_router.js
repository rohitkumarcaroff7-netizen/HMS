import express from 'express'
import { createRoom, getAllRooms, getRooms } from '../controllers/room_controller.js'
import { auth, authAdmin } from '../middlewares/user-middleware.js'

const router = express.Router()

router.post("/create", createRoom)
router.get("/getAllRoom", getAllRooms)
router.get("/getRoom", getRooms)

export default router