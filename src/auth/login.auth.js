import User from '../models/user.model.js'
import generateToken from '../utils/jwt.util.js';
import bcrypt from 'bcryptjs';

const Login = async(req,res)=>{

    try{

        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({message:"required field missed"});
        }
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credential"});
        }

        const token = await generateToken(user._id);
        return res.json({token,user:{id:user._id,email:user.email}});


    }catch(error){
        return res.status(500).json({message:"Internal server error",error:error.message});
    }
}

export default Login;