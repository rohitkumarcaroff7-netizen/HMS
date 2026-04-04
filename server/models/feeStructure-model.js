import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema(
  {
    messadv: { type: Number, default: 15000, min: 0 },
    seatrent: { type: Number, default: 8000, min: 0 },
    electricityfee: { type: Number, default: 3600, min: 0 },
    devfee: { type: Number, default: 2000, min: 0 },
    cmoney: { type: Number, default: 1000, min: 0 },
    comcharge: { type: Number, default: 200, min: 0 },
  },
  { timestamps: true }
);

export const FeeStructure = mongoose.model("FeeStructure", feeStructureSchema);
