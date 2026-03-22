import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    price: {type: Number, required: true},
    room_no: {type: Number, required: true},
    isAvailable: {type: Boolean, default: true},
    stu_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

export const Room = mongoose.model("Room",roomSchema)