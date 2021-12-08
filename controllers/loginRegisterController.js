const  Express =require("express");
const router=Express.Router();
require('dotenv').config()
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const dbconnection = require("../DbConnection.js");

const User = require("../models/userdetails");

exports.User_Register = async (req, res, next) => {
	try {
        const { Name, User_Name, Contact_Number,Birthdate,Password } = req.body;
        var UserProfile =req.file.path
        //console.log(req.file);
        //console.log(UserProfile)
        const oldUser = await User.findOne({ User_Name });
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(Password, 10);
    
        const user = await User.create({
          Name,
          User_Name,
          Contact_Number,  
          Birthdate,
          Password: encryptedPassword,
          UserProfile,
        });
    
        const token = jwt.sign(User_Name, process.env.ACCESS_TOKEN_KEY, {
          algorithm: "HS256",
        })
        console.log("token:", token)
      //  user.token = token;
  
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
    
  };

  exports.User_Login = async (req, res, next) => {
    try {
  
        const { User_Name, Password } = req.body;
        if (!(User_Name && Password)) {
          res.status(400).send("Please Enter Valid Inputs");
        }
        const user = await User.findOne({ User_Name });
    
        if (user && (await bcrypt.compare(Password, user.Password))) {
    
          const token = jwt.sign(User_Name, process.env.ACCESS_TOKEN_KEY, {
            algorithm: "HS256",
          })
         // console.log("Logged in User's Token: ", token)
    
          //user.token = token;
          console.log("token After Login:", token)
          res.status(200).json({User_Name:user.User_Name,Name:user.Name,token});
        }else{
        res.status(400).send("Invalid Credentials || Wrong username or password");}
      } catch (err) {
        console.log(err);
      }
  };
