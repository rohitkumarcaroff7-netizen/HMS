import { FeeStructure } from "../models/feeStructure-model.js";

const defaultFeeStructure = {
  messadv: 15000,
  seatrent: 8000,
  electricityfee: 3600,
  devfee: 2000,
  cmoney: 1000,
  comcharge: 200,
};

const normalizeFeeStructure = (payload = {}) => ({
  messadv: Number(payload.messadv ?? defaultFeeStructure.messadv),
  seatrent: Number(payload.seatrent ?? defaultFeeStructure.seatrent),
  electricityfee: Number(
    payload.electricityfee ?? defaultFeeStructure.electricityfee
  ),
  devfee: Number(payload.devfee ?? defaultFeeStructure.devfee),
  cmoney: Number(payload.cmoney ?? defaultFeeStructure.cmoney),
  comcharge: Number(payload.comcharge ?? defaultFeeStructure.comcharge),
});

const hasInvalidValue = (feeStructure) =>
  Object.values(feeStructure).some(
    (value) => Number.isNaN(value) || value < 0
  );

export const getFeeStructure = async (req, res) => {
  try {
    const feeDoc = await FeeStructure.findOne().sort({ updatedAt: -1 });

    if (!feeDoc) {
      return res.status(200).json(defaultFeeStructure);
    }

    res.status(200).json(normalizeFeeStructure(feeDoc));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateFeeStructure = async (req, res) => {
  try {
    const nextFeeStructure = normalizeFeeStructure(req.body);

    if (hasInvalidValue(nextFeeStructure)) {
      return res.status(400).json({ message: "Invalid fee structure data." });
    }

    const updatedFeeStructure = await FeeStructure.findOneAndUpdate(
      {},
      nextFeeStructure,
      { new: true, upsert: true }
    );

    res.status(200).json(normalizeFeeStructure(updatedFeeStructure));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
