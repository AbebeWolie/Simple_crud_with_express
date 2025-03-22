

const authorizRolles = (...allowdRoles)=>{
    return (req,res,next)=>{
        if(!allowdRoles.includes(req.user.role)){
            return res.status(401).json({message:`Access Denied ${req.user.role} cannot do this`});
        }
        return next(); 
    }
}

export default authorizRolles;