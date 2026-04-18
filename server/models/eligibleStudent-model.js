import mongoose from "mongoose";

const eligibleStudentEntrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    regd_no: { type: String, required: true, trim: true },
    course: {
      type: String,
      enum: ["MCA", "MBA", "M.TECH", ""],
      default: "",
    },
    st_yr: {
      type: String,
      enum: ["1st", "2nd", ""],
      default: "",
    },
  },
  { _id: true }
);

const eligibleStudentListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      default: "Eligible Student List",
    },
    students: {
      type: [eligibleStudentEntrySchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const EligibleStudentList = mongoose.model(
  "EligibleStudentList",
  eligibleStudentListSchema
);
