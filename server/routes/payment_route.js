import express from 'express';
import { createCheckoutSession, stripeWebhook, getAvailableRooms, getAdminRoomStats } from '../controllers/payment_controller.js';
import { auth } from '../middlewares/user-middleware.js';

const router = express.Router();

// Route to create Stripe checkout session
router.post("/checkout/create-checkout-session", createCheckoutSession);

// Route to handle Stripe webhook (raw body used here)
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// Admin route to get room stats
router.get('/admin/stats', getAdminRoomStats);

// Student route to view available rooms
router.get('/student/rooms', auth, getAvailableRooms);

export default router;
