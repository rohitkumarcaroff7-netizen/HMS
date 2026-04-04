export const FEE_STRUCTURE_API = "http://localhost:3000/api/feestructure";

export const defaultFeeStructure = {
  messadv: 15000,
  seatrent: 8000,
  electricityfee: 3600,
  devfee: 2000,
  cmoney: 1000,
  comcharge: 200,
};

const feeKeys = Object.keys(defaultFeeStructure);

export const calculateTotalAmount = (feeStructure) =>
  feeKeys.reduce((total, key) => total + Number(feeStructure[key] || 0), 0);

export const normalizeFeeStructure = (feeStructure = {}) =>
  feeKeys.reduce((acc, key) => {
    acc[key] = Number(feeStructure[key] ?? defaultFeeStructure[key]);
    return acc;
  }, {});
