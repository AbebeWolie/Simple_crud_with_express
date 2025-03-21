import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const generateToken = async(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"1H"});
}


export default generateToken;