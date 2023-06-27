
const express=require("express");
const fs=require("fs");
const bodyParser="body-parser";
const users=require("./usersData.json");


const app=express();


// /middleware
app.use(express.urlencoded({extended:false}));
// app.get("/users",(req,res)=>{
//     const html=`
//     <ul>
//     ${users.map((user)=>
//      `<li>${user.first_name}</li>`
//     ).join("")}
//     </ul>`;
//     res.send(html);
//  });


app.use
app.get("/api/users",(req,res)=>{
    res.setHeader("X-myName","Prasu Gupta");
    // always use X-to custom Header
    res.json(users);
});
app.post("/api/users",(req,res)=>{
 
    const body=req.body;
    if(!body || !body.first_name || !body.email || !body.gender || !body.last_name || !body.ip_address){
        res.status(400).json({msg:"all fields are required"});
    }
    // console.log("Body " ,body);
    users.push({...body,id:users.length+1});
    fs.writeFile("./usersData.json",JSON.stringify(users),(err,data)=>{
        res.status(201).json({status:"success",id:users.length});

    });

});
app.route("/api/users/:id")
.get((req,res)=>{
const id=Number(req.params.id);
const user=users.find((user)=>user.id===id);
if(!user){
    res.status(404).json({msg:"user not found"});
}
return res.json(user);
        })
        .put((req,res)=>{
            res.json({status:"pending"});

        })
        .post((req,res)=>{
            const id=Number(req.params.id);
const user=users.find((user)=>user.id===id);

            return res.json(user);


        })
        
        .delete((req,res)=>{
            res.json({status:"pending"});

        });
    
app.listen(8000,()=>{
    console.log("server started");
});