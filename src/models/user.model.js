import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true, unique:true},
    password:{type:String,require:true},
    role:{type:String,enum:["admin","user"],default:"user"}
})

userSchema.pre("save",async function (next){
    if(!this.isModified('password')){
            return next();
        }
   
    try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
        next();

   }catch(error){
    next(error);
   }


}
)

userSchema.pre('findOneAndUpdate',async function (next){
    const update = this.getUpdate();
    try{
        if(update.password){
            const salt = await bcrypt.genSalt(10)
            update.password = await bcrypt.hash(update.password, salt);
            this.setUpdate(update);
        }
    }catch(error){
        next(error)
    }
} )

const User = mongoose.model('User',userSchema);

export default User;