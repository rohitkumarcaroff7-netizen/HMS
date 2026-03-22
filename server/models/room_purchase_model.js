import mongoose from "mongoose";

const purchaseSchema = mongoose.Schema({
  stu_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  room_no: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  isPurchased: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  paymentId: {
    type: String,
    required: true,
  },
},{timestamps:true});

export const RoomPurchase = mongoose.model("RoomPurchase", purchaseSchema)