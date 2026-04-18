import {User}from "../models/user-models.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import crypto from "crypto";
// import {
//   deleteMediaFromCloudinary,
//   uploadMedia,
// } from "../config/cloudinary.js";


// const User = require('../models/user-models.js');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

export const register = async (req, res) => {
  const { username, email, password, course, regd_no, st_yr, address, gender, phone } = req.body;

  try {
    const userExist = await User.findOne({ email });
    console.log(userExist);
    if (userExist) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hash_password,
      course,
      regd_no,
      st_yr,
      address,
      gender,
      phone,
    });

    console.log(user);

    const token = await user.generateToken();
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "User not exists!" });
    }
    const isMatched = await bcrypt.compare(password, userExist.password);
    if (!isMatched) {
      return res.status(400).json("Invalid credentials.");
    }
    res.status(200).json({ msg :"Login Successfull",userExist, token: await userExist.generateToken(),userId:userExist._id.toString() });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};



export const forgot_password = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found. Login first!");
    }
    const otp = crypto.randomInt(100000, 999999);
    const otpExpires = Date.now() + 10 * 60 * 1000;
    user.resetOTP = otp;
    user.resetOTPExpire = otpExpires;
    await user.save();
    const transport = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`,
    };

    await transport.sendMail(mailOptions);
    res.status(200).json("OTP sent successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("User not found");
    if (!user.resetOTP || user.resetOTPExpire < Date.now())
      return res.status(400).json("OTP expired.");
    if (user.resetOTP != parseInt(otp))
      return res.status(400).json("Invalid OTP");

    user.resetOTP = undefined;
    user.resetOTPExpire = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });

    res.status(200).json({ message: "OTP verified successfully.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

export const reset_password = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json("User not found");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json("Password successfully updated.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

export const getUserData = async(req, res)=>{
  try {
    const id = req.params.id
    const user = await User.findById(id).select("-password")
    if(!user){
      return res.status(400).json("Not found")
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
}

// export const updateProfile = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { username } = req.body;
//     const profilePic = req.file;
//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     let profileUrl = user.photoUrl; // Default to existing image

//     if (profilePic) {
//       if (user.photoUrl) {
//         const publicId = user.photoUrl.split("/").pop().split(".")[0];
//         await deleteMediaFromCloudinary(publicId);
//       }
//       const cloudRes = await uploadMedia(profilePic.path);
//       profileUrl = cloudRes.secure_url;
//     }

//     const updateData = {};
//     if (username) updateData.username = username;
//     if (profileUrl) updateData.photoUrl = profileUrl;

//     const newData = await User.findByIdAndUpdate(id, updateData, {
//       new: true,
//     }).select("-password");
//     res.status(200).json(newData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const getAllStudents = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } ,purchasedRoom: { $ne: null }}).select("-password").select("-purchasedRoom")
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" })
  }
};

export const getMCAStudents = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } ,purchasedRoom: { $ne: null },course:"MCA"}).select("-password").select("-purchasedRoom")
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" })
  }
};

export const getMBAStudents = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } ,purchasedRoom: { $ne: null },course:"MBA"}).select("-password").select("-purchasedRoom")
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" })
  }
};

export const getMTECHStudents = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } ,purchasedRoom: { $ne: null },course:"M.TECH"}).select("-password").select("-purchasedRoom")
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" })
  }
};

export const getEligibleStudents = async (req, res) => {
  try {
    const users = await User.find({
      role: { $ne: "admin" },
      purchasedRoom: null,
    })
      .select("username regd_no course st_yr gender photoUrl")
      .sort({ username: 1 });

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateRole = async(req, res)=>{
  try {
    const {id} = req.params
    const {newRole} = req.body
    const user = await User.findByIdAndUpdate(id, {role: newRole}, {new:true})
    if(!user){
      return res.status(404).json("User not found")
    }
    res.status(200).json({user, message:"User updated successfully."})
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async(req,res)=>{
  try {
    const {id} = req.params
    const user = await User.findByIdAndDelete(id)
    if(!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json({message: "User deleted successfully." });
  } catch (error) {
    console.log(error)
  }
}
