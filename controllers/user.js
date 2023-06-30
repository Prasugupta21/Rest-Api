const User=require("../models/user");
async function handleGetAllUsers(req,res){
    const allDbUsers=await User.find({});

    res.json(allDbUsers);
}
async function handlegetUserById(req,res){
    const user=await User.findById(req.params.id);
    if(!user){
        res.status(404).json({msg:"user not found"});
    }
    return res.json(user);
}
async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id,{lastName:"changed"})
    res.json({status:"Success"});
}
async function handleCreateUser(req,res){
    const body=req.body;
    if(!body || !body.first_name || !body.email || !body.gender || !body.last_name || !body.ip_address){
        res.status(400).json({msg:"all fields are required"});
    }
    
   const result= await User.create(({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        ipAddres:body.ip_address
    }));
    res.status(201).json({msg:"success",id:result._id});
    
}
async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    res.json({status:"Success"});

}

module.exports={
    handleGetAllUsers,
    handlegetUserById,
    handleUpdateUserById,
    handleCreateUser,
    handleDeleteUserById
}