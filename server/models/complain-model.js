import mongoose from "mongoose";

export const complainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone_no: { type: String, required: true },
  message: { type: String, required: true }
},{timestamps:true});
export const Complain = mongoose.model("Complain", complainSchema);
