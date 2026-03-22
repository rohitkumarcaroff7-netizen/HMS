import express from "express";
import { config } from "dotenv";
import { connectDB } from "./utils/db.js";
import authRouter from "./routes/userRoute.js";
import complainRouter from "./routes/complain-router.js";
import requestRouter from "./routes/request-router.js";
import roomRouter from "./routes/room_router.js";
import paymentRouter from "./routes/payment_route.js";
import adminRoute from "./routes/admin-router.js";
import contactRoute from "./routes/contactRoute.js";
import foodMenuRoute from "./routes/foodmenu-router.js";
import eventRoute from "./routes/event-router.js";
import foodNoticeRoute from "./routes/foodnotice-router.js";
// import studentRouter from './routes/student-route.js';
import cors from "cors";

config();

const app = express();

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Raw body middleware for Stripe Webhook (this must come **before** express.json())
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

// Global JSON parser for all other routes
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/complain", complainRouter);
app.use("/api/request", requestRouter);
app.use("/api/room", roomRouter);
app.use("/api/admin", adminRoute);
app.use("/api/payment", paymentRouter);
app.use("/api/contact", contactRoute);
app.use("/api/foodmenu", foodMenuRoute);
app.use("/api/events", eventRoute);
app.use("/api/foodnotice", foodNoticeRoute);
// app.use("/api/getStudents", studentRouter);

// Start the server
const PORT = process.env.PORT || 4000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
