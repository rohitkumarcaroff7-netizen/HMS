import {User} from '../models/user-models.js'
import { Complain } from '../models/complain-model.js';
import { Room } from '../models/room_model.js';
import { Contact } from "../models/contact-model.js";

export const getAllUser = async (req, res) => {
    try {
      const users = await User.find({ role: { $ne: "admin" } }).select('-password');
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  export const getContact = async (req, res) => {
    try {
      const complains = await Complain.find({ role: { $ne: "admin" } }).select('-password');
      res.status(200).json(complains);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

export const getSupport = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ _id: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteSupport = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Support message not found." });
    }
    res.status(200).json({ message: "Support message deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

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


export const deleteComplain = async(req,res)=>{
  try {
    const {id} = req.params
    const complain = await  Complain.findByIdAndDelete(id)
    if(!complain) {
      return res.status(404).json("Complain not found");
    }
    res.status(200).json({message: "Complain deleted successfully." });
  } catch (error) {
    console.log(error)
  }
}

export const getPaymentDetails = async (req, res) => {
  try {
    const bookedRooms = await Room.find({
      isAvailable: false,
      stu_id: { $ne: null },
    })
      .populate("stu_id", "username email regd_no phone course st_yr")
      .sort({ room_no: 1 });

    res.status(200).json(bookedRooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
