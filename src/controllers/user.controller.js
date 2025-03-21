import User from "../models/user.model.js"

const findon = async(email)=>{
    return await User.findOne(email);
}


const getUser = async(req,res)=>{
    try{
        const user = await User.find();
        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({message:'Internal server error',error:error.message})
    }

}


const getUserById = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:`No user found with this ${req.params.id}`})
        }
        return res.status(200).json(user)
    }catch(error){
        return res.status(200).json({message:"Internal server error",error:error.message})
    }
}

const addUser = async(req,res)=>{
    try{
        const{name,email,password,role} = req.body;
        const existingUser = await findon({email});
        if(existingUser){
            return res.status(400).json({message:"User already exist"})
        }
        const newUser = new User({name,email,password,role});
        newUser.save();

        return res.status(200).json({message:"User Successfuly Added",user:newUser});

    }catch(error){
        return res.status(500).json({message:"Internal Server error",error:error.message});
    }
}


const updateUserById = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body
        const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updateUser){
            return res.status(404).json({message:"No user found with this id"})
        }

        return res.status(200).json({message:"Successfully Updated",updateUser})

    }catch(error){
        return res.status(500).json({message:"Internal Server error",error:error.message})
    }

}


const deleteUserById = async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({message:"No user found to delete with this Id "});
        }
        return res.status(200).json({message:"Successfully deleted",user})

    }catch(error){
        return res.status(500).json({message:"Enternal server error",error:error.message})
    }
}




const Login = async(req,res)=>{

    try{
        const{email,password} = req.body
        const user = await User.findOne({email})

        if(!user||!(await bcrypt.compare(password,user.password))){
            return res.status(401).json({message:"Invalid Cridential"});
        }

    }
    catch(error){

        return res.status(500).json({message:"Internal server Errorr",error:error.message})
    }
}

export default 
    {
        getUser,
        addUser,
        getUserById,
        updateUserById,
        deleteUserById
    };