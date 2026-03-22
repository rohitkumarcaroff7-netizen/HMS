import mongoose from "mongoose";



const URI =process.env.MONGODB_URI;

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected successfull`);
    } catch (error) {
        console.log(`Database connection failed`);
        console.error(error);
        process.exit(0);
    }
}
