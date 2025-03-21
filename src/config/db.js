import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectionDb = async(req,res)=>{
    try{
        const db = await mongoose.connect(process.env.MONGO_URI);
        if(db){
            console.log('DataBase Is successfully connected')
        }
    }
    catch(error){
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export default connectionDb;