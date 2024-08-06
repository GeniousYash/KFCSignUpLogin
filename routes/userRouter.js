const Router = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const auth = require("../middleware/authmiddleware");
const userRouter = Router();

userRouter.post("/register",async(req,res)=> {
     const {userfirstname, usersecondname , email, phnumber, password } = req.body;
     console.log(req.body);
     try{
          bcrypt.hash(password, 5, async(err, hash)=> {
               if(err){
                    res.status(500).json({
                         message:"Error while hashing the Password",
                    });
               }
               console.log(hash);
               const user = new UserModel({userfirstname,usersecondname,email,phnumber,password:hash});
               await user.save();
               res.status(201).json({
                    message:"user Successfully registered"
               });
          });
     }catch(error){
          res.status(500).json({
               message:"Error while registering the user"
          });
     };
});

userRouter.post("/login", async(req,res)=>{
     const{email, password} = req.body;
     try{
          const user = await UserModel.findOne({email});
          console.log(user);
          if(user){
               bcrypt.compare(password, user.password, function(err, result){
                    if(result){
                         const token = jwt.sign({ userID: user._id, user:user.username }, 'masai');
                         res.status(200).json({
                              message: "User logged in successfully", token
                         });
                    }else{
                         res.status(401).json({
                              message: "Wrong Password"
                         });
                    }
               });
          }else{
               res.status(401).json({
                    message: "User not found, please register first"
               });
          }
     }catch(error){
          res.status(500).json({
               message: "Error in loggin in the user", error
          });
     }
});

module.exports = userRouter;
