const ServiceUser = require("../models/service-model");

const services = async(req,res)=>{

try {
    const response =await ServiceUser.find();
    if(!response){
        res.status(404).json({msg:"No service found"});
        return;
    }
    res.status(200).json({msg:response})
} catch (error) {
    console.log("service error",error)
}

}
module.exports = services;