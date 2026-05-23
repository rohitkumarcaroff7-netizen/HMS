import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: {type: String, required: true},
    regd_no:{type: String, required: true},
    course: {type: String, enum: ["MBA","MCA","M.TECH"], default: "MCA"},
    st_yr:{type: String, enum: ["1st", "2nd"], default: "1st"},
    address:{type: String, required: true},
    gender:{ type: String, enum: ["male", "female"], default: "male" },
    password: { type: String, required: true },
    resetOTP: { type: String, default: 0 },
    resetOTPExpire: { type: Number, default: 0 },
    purchasedRoom: {type: mongoose.Schema.Types.ObjectId, ref:"Room", default:null},
    role: { type: String, enum: ["student", "admin"], default: "student" },
    photoUrl : {type: String, default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"},
    profileImage: {
      data: { type: Buffer, default: null },
      contentType: { type: String, default: "" },
      fileName: { type: String, default: "" },
    }
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "20h" }
    );
  } catch (error) {
    console.log(error)
  }
};

export const User = mongoose.model("User",userSchema);
