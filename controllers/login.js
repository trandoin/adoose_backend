const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AccountDetails = require('../models/AccountDetails');
const GuestUser = require('../models/user2');
const hashing = require('./Functions/Hashing');
const hashFunctions = require('./Functions/Hashing');
const dotenv = require('dotenv'); 
const login = async(req,res)=>{

    const {Mobile,Username,Password,Email,guest} = req.body;
    console.log(guest)
    console.log(Mobile,Username,Password,Email);

    if(guest==true) {
        console.log("Andar aaya")
        const hashPassword = await hashFunctions.hashing(Password);
        const savedUser = await GuestUser.create({Email:Email,Mobile:Mobile,Password:hashPassword,Username:Username});
        let existingUser = null;
        if(Mobile)          existingUser = await GuestUser.findOne({Mobile : Mobile});
        else if(Email)      existingUser = await GuestUser.findOne({Email : Email});
        else if(Username)    existingUser = await GuestUser.findOne({Username : Username});
        const Token = await jwt.sign({_id:existingUser._id},process.env.JWT_SECRET);
            return res.status(200).json({type:'success',message:'Login confirmed. Taking you to the next page',user : existingUser,Token : Token});
    }
   else {
    let existingUser = null;
    if(Mobile)          existingUser = await User.findOne({Mobile : Mobile});
    else if(Email)      existingUser = await User.findOne({Email : Email});
    else if(Username)    existingUser = await User.findOne({Username : Username});

    console.log(existingUser)
    if(existingUser===null || existingUser===undefined)     return res.status(200).json({type : "error",message:"Fields do not match."})
    
    const isSamePassword = await hashing.isHashedPassword(Password,existingUser.Password);
    existingUser.Password = undefined;
    if(isSamePassword){
        if(existingUser.active===false)
        {
            return res.status(200).json({type:'error',message:undefined});
        }
        else
        {
            const Token = await jwt.sign({_id:existingUser._id},process.env.JWT_SECRET);
            return res.status(200).json({type:'success',message:'Login confirmed. Taking you to the next page',user : existingUser,Token : Token});
        }
    }
    else                    return res.status(200).json({type:'error',message:'Fields do not match.'});
  }
}

const getAllUsers = async(req,res) => {
    const result = await User.find();
    return res.send(result)
}

const AddAccountDetails = async(req,res) => {
    console.log(req.body)
    const Recipient_Name = req.body.name;
    const Acc_No = req.body.acc_no;
    const IFSC = req.body.ifsc;
    const data = await AccountDetails.create({
        Recipient_Name: Recipient_Name,
        Acc_No: Acc_No,
        IFSC: IFSC
    })
    return res.send(data)
}

module.exports = {login,getAllUsers,AddAccountDetails};