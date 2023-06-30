
const express=require("express");
const userRouter=require("./routes/user");
const {connectMongoDB}=require("./connection")
const {logReqRes}=require("./middlewares");
const app=express();

//connection
connectMongoDB("mongodb://127.0.0.1:27017/MongoDBLearning").then(()=>{
    console.log("MongoDB connected");
}).catch(err=>{
    console.log("Mongo err",err);
});

// /middleware
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("log.txt"));


//Routes
app.use("/api/users",userRouter);


app.listen(8000,()=>{
    console.log("server started");
});