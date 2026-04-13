import { Room } from "../models/room_model.js";

export const createRoom = async(req,res)=>{
    const {room_no, price} = req.body
    try {
        const room = await Room.create({room_no,price})
        res.status(200).json({room, msg:"Room created successfully."})
    } catch (error) {
        console.log(error)
    }
}

export const getAllRooms = async(req,res)=>{
    try {
        const rooms = await Room.find().populate(
            "stu_id",
            "username email regd_no phone course st_yr address gender photoUrl"
        );
        if(!rooms){
            return res.status(404).json({msg:"Room not found."})
        }
        res.status(202).json({rooms})
    } catch (error) {
        console.log(error)
    }
}

export const getRooms = async(req,res)=>{
    try {
        const room = await Room.find({isAvailable:true})
        if(!room){
            return res.status(404).json({msg:"Room not found."})
        }
        return res.status(201).json(room)
    } catch (error) {
        console.log(error)
    }
}
