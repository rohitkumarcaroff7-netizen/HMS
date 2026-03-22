import express from 'express'
import {auth, authAdmin} from '../middlewares/user-middleware.js'
import { getAllUser, deleteUser, getContact, deleteComplain, getPaymentDetails, getSupport, deleteSupport } from '../controllers/admin-controller.js';

const router =express.Router();


router.get('/getUser', auth, authAdmin, getAllUser)
router.get('/getContact', auth, authAdmin, getContact)
router.get('/getSupport', auth, authAdmin, getSupport)
router.get('/getPayments', auth, authAdmin, getPaymentDetails)
router.delete('/deleteUser/:id', auth, authAdmin, deleteUser)
router.delete('/deleteComplain/:id', auth, authAdmin, deleteComplain)
router.delete('/deleteSupport/:id', auth, authAdmin, deleteSupport)

export default router
