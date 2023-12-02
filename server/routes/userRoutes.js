const express = require("express")
const generateToken = require("../config/token");
const { User }=require("../config/db")
const { registerUser, loginUser,}=require("../controllers/userController");

const router=express.Router();


router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);



module.exports=router;
