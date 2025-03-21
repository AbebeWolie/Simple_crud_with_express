import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js';
dotenv.config();

// const authUser = async(req,res,next)=>{
  
//     try{ 

//         const token = req.header("Authorization");

//         if(!token){
//             return res.status(401).json({message:"Access Denied Tocken not provided"})
//         }

//         const decoded = await jwt.verify(token,process.env.JWT_SECRET);
//         req.user=decoded;
//         next();

//     }
//     catch(error){

//         return res.status(400).json({message:"Invalid Token"})
//     }
// }


// const authAdmin = (req,res,next)=>{
   
//     if(req.user.role !== 'admin'){
//         return res.status(400).json({message:"Access Denied only Admin Allowed"});
//     }

//     next();
// }




const protectRoute = async(req,res,next)=>{

    try{
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({message:"Auth required"});
        }

        const decode = await jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decode.id).select('-password');
        return next();
    }catch(error){
        return res.status(500).json({message:"Internal server error",error:error.message});
    }

}

export default protectRoute;

