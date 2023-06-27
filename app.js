
const express=require("express");
const fs=require("fs");
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



app.get("/api/users",(req,res)=>{
console.log("i am in get route ",req.myUserName)
    res.json(users);
});
app.post("/api/users",(req,res)=>{
 
    const body=req.body;
    // console.log("Body " ,body);
    users.push({...body,id:users.length+1});
    fs.writeFile("./usersData.json",JSON.stringify(users),(err,data)=>{
        res.json({status:"success",id:users.length});

    });

});
app.route("/api/users/:id")
.get((req,res)=>{
const id=Number(req.params.id);
const user=users.find((user)=>user.id===id);
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