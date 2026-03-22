import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    breakfast: { type: String, default: "" },
    lunch: { type: String, default: "" },
    dinner: { type: String, default: "" },
  },
  { _id: false }
);

const foodMenuSchema = new mongoose.Schema(
  {
    items: {
      Monday: { type: mealSchema, default: () => ({}) },
      Tuesday: { type: mealSchema, default: () => ({}) },
      Wednesday: { type: mealSchema, default: () => ({}) },
      Thursday: { type: mealSchema, default: () => ({}) },
      Friday: { type: mealSchema, default: () => ({}) },
      Saturday: { type: mealSchema, default: () => ({}) },
      Sunday: { type: mealSchema, default: () => ({}) },
    },
  },
  { timestamps: true }
);

export const FoodMenu = mongoose.model("FoodMenu", foodMenuSchema);
