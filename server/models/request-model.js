import mongoose from "mongoose";

export const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone_no: { type: String, required: true },
  subject: { type: String, required: true },
  message:{type:String , required:true}
},{timestamps:true});

export const Request = mongoose.model("Request", requestSchema);
