import { Request } from "../models/request-model.js";

export const requestForm = async (req,res)=>{
    const{name,phone_no,subject,message}=req.body
    try{
        const msg = await Request.create({name,phone_no,subject,message});
        return res.status(200).json({message:"Request send successfully",msg})
    }catch(error){
        return res.status(500).json({message:"Request not delivered."})
    }
}
