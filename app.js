
const express=require("express");
const fs=require("fs");
const mongoose=require("mongoose");


const app=express();
mongoose.connect("mongodb://127.0.0.1:27017/MongoDBLearning").then(()=>{
    console.log("Mongodb connected");
}).catch(err=>{
    console.log(err);
})
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String
    },
    ipAddres:{
        type:String
    },
   
},{timestamps:true});
const User=mongoose.model("User",userSchema);
// /middleware
app.use(express.urlencoded({extended:false}));
app.get("/users", async (req,res)=>{
    const allDbUsers=await User.find({});
    const html=`
    <ul>
    ${allDbUsers.map((user)=>
     `<li>${user.firstName} -${user.email}</li>`
    ).join("")}
    </ul>`;
    res.send(html);
 });



app.get("/api/users",async (req,res)=>{
    const allDbUsers=await User.find({});

    res.json(allDbUsers);
});
app.post("/api/users",async (req,res)=>{
 
    const body=req.body;
    if(!body || !body.first_name || !body.email || !body.gender || !body.last_name || !body.ip_address){
        res.status(400).json({msg:"all fields are required"});
    }
    // console.log("Body " ,body);

await User.create(({
    firstName:body.first_name,
    lastName:body.last_name,
    email:body.email,
    gender:body.gender,
    ipAddres:body.ip_address
}));
// console.log("result",body);
res.status(201).json({msg:"success"});
});
app.route("/api/users/:id")
.get(async (req,res)=>{
    const user=await User.findById(req.params.id);
if(!user){
    res.status(404).json({msg:"user not found"});
}
return res.json(user);
        })
        .patch(async (req,res)=>{
await User.findByIdAndUpdate(req.params.id,{lastName:"changed"})
            res.json({status:"Success"});

        })
        .post((req,res)=>{
            const id=Number(req.params.id);
const user=users.find((user)=>user.id===id);

            return res.json(user);


        })
        
        .delete(async(req,res)=>{
            await User.findByIdAndDelete(req.params.id);
            res.json({status:"Success"});

        });
    
app.listen(8000,()=>{
    console.log("server started");
});