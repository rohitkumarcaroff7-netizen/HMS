import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    image: {
      data: { type: Buffer, default: null },
      contentType: { type: String, default: "" },
      fileName: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export const CarouselImage = mongoose.model("CarouselImage", carouselSchema);
