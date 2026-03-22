import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
