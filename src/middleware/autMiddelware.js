import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


const authUser = async(req,res,next)=>{
  
    try{ 

        const token = req.header("Authorization");

        if(!token){
            return res.status(401).json({message:"Access Denied Tocken not provided"})
        }

        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();

    }
    catch(error){

        return res.status(400).json({message:"Invalid Token"})
    }
}


const authAdmin = (req,res,next)=>{
   
    if(req.user.role !== 'admin'){
        return res.status(400).json({message:"Access Denied only Admin Allowed"});
    }

    next();
}