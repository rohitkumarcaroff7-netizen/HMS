import {Complain} from "../models/complain-model.js";

export const complainForm = async (req,res)=>{
    const{name,phone_no,message}=req.body
    try{
        const msg = await Complain.create({name,phone_no,message});
        console.log(msg);
        return res.status(200).json({message:"Complain send successfully",msg})
    }catch(error){
        return res.status(500).json({message:"Complain not delivered."})
    }
}
