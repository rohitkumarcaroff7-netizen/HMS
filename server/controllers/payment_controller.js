import Stripe from "stripe";
import { User } from "../models/user-models.js";
import { config } from "dotenv";
import { Room } from "../models/room_model.js";
config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
export const createCheckoutSession = async (req, res) => {
  const { roomId, userId } = req.body;

  try {
    const existingRoom = await Room.findOne({ stu_id: userId });
    console.log(existingRoom)
    if (existingRoom) {
      return res.status(400).json({ message: "You have already booked a room." });
    }

    const room = await Room.findById(roomId);
    if (!room || !room.isAvailable) {
      return res.status(400).json({ message: "Room is not available." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Room No. ${room.room_no}`,
              description: "Hostel room booking",
            },
            unit_amount: room.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/failed`,
      metadata: {
        roomId: room._id.toString(),
        userId: userId.toString(),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ message: "Checkout session creation failed." });
  }
};

// Stripe webhook
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { roomId, userId } = session.metadata;
  
    try {
      await Room.findByIdAndUpdate(roomId, {
        isAvailable: false,
        stu_id: userId,
      });
  
      await User.findByIdAndUpdate(userId, {
        purchasedRoom: roomId,
      });
  
      console.log(`Room ${roomId} booked by user ${userId}`);
    } catch (error) {
      console.error("Room update error:", error);
    }
  }
}  

export const getAdminRoomStats = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const bookedRooms = await Room.countDocuments({ isAvailable: false });
    const availableRooms = await Room.countDocuments({ isAvailable: true });

    res.status(200).json({ totalRooms, bookedRooms, availableRooms });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats." });
  }
};

// Student: View available rooms
export const getAvailableRooms = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.purchasedRoom) {
      const room = await Room.findById(user.purchasedRoom);
      return res.status(200).json({
        hasBooked: true,
        bookedRoomId: user.purchasedRoom,
        rooms: room ? [room] : [],
      });
    }

    const availableRooms = await Room.find({ isAvailable: true });
    res.status(200).json({
      hasBooked: false,
      bookedRoomId: null,
      rooms: availableRooms,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rooms." });
  }
};
