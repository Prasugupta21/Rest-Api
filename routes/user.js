const express=require("express");
const { handleGetAllUsers, handlegetUserById, handleUpdateUserById ,   handleCreateUser,handleDeleteUserById} = require("../controllers/user");
const router=express.Router();





router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router.route("/:id")
.get(handlegetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);

module.exports=router;