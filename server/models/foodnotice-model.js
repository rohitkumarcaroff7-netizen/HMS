import mongoose from "mongoose";

const foodNoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, default: "Food Notice" },
    notices: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const FoodNotice = mongoose.model("FoodNotice", foodNoticeSchema);
