const mongoose = require('mongoose');
const User = require('../models/User');
const hashFunctions = require('./Functions/Hashing');
const MailServer = require('./Functions/MailServer');
const randomstring = require('randomstring');
const dotenv = require('dotenv'); 

const LinkMap = new Map();
const ForgetMap = new Map();

// checking link validity for forget
const checkLinkValidityForget = async(req,res)=>{

    const {id} = req.body;
    if(id===undefined || id===null)     return res.status(200).json({type:'error',message:'Some error occured.'});

    if(ForgetMap.get(id)===undefined)       return res.status(200).json({type:"error",message:"Link expired. Redirecting..."});
    else                                    return res.status(200).json({type:"Success",message:"Hurry up. Time is limited."})
}

// Checking link validity for verification
const checkLinkValidityVerification = async(req,res)=>{

    const {id} = req.body;
    if(id===undefined || id===null)     return res.status(200).json({type:'error',message:'Some error occured.'});

    if(LinkMap.get(id)===undefined)       return res.status(200).json({type:"error",message:"Link expired. Redirecting..."});
    else                                    return res.status(200).json({type:"Success",message:"Hurry up. Time is limited."})
}

// Generating link for password forget
const forgetPassword = async(req,res)=>{            

    const {Email,Mobile} = req.body
    let link = await randomstring.generate();
    while(ForgetMap.get(link)!=undefined)       link = await randomstring.generate();

    if(Email!=null && Email.length>0 && Email!=undefined){
        const userExists = await User.findOne({Email : Email});
        if(userExists===undefined || userExists=== null)                return res.status(200).json({type:"error",message : "No user found"});
        
        ForgetMap.set(link,Email);
        await MailServer.resendPassword(Email,process.env.WebsiteURLForget+link);
        setTimeout(()=>{
            ForgetMap.delete(link);
        },1000*60*10);
        return res.status(200).json({type:"success",message:"A mail has been sent to your registered email address to reset your password."})
    }
}

// Setting up new password
const forgetMail = async(req,res)=>{
    const {id,newpassword} = req.body;
    console.log(id,newpassword);
    if(ForgetMap.get(id)===undefined)       return res.status(200).json({type:"error",message:"something bad happened"});

    const Email = ForgetMap.get(id);
    if(Email===null || Email===undefined)       return res.status(200).json({type:"error",message:"Link Expired or unable to use."});
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const mobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if(emailRegex.test(Email))
    {
        const user = await  User.findOne({Email : Email});
        if(user===undefined || user === null)       return res.status(200).json({type : "error",message:"No user found"});
        const hashed = await hashFunctions.hashing(newpassword);
        await User.updateOne({Email : Email},{$set:{Password : hashed}});
        ForgetMap.delete(id);
        return res.status(200).json({type:"success",message:"Your password is changed successfully."});
    }
    else
    {

    }
}

// Actual Verification of the mail
const verification = async(req,res)=>{
    const {id} = req.body;
    console.log(id);
    if(LinkMap.get(id)===undefined)     return res.status(200).json({type:'error',message:"Link is not valid."});
    const user = await User.findOne({Email : LinkMap.get(id)});
    if(user.active===true)      return res.status(200).json({type:'success',message:'Account is already verified.'});
    await User.findOneAndUpdate({Email:LinkMap.get(id)},{active:true});
    await LinkMap.delete(id);
    return res.status(200).json({type:'success',message:"Account verified successfully."});
}

// Generating mail for verification
const verificationMail = async(req,res)=>{
    const {Email,Mobile}= req.body;
    let link = await randomstring.generate();
    while(LinkMap.get(link)!=undefined)       link = await randomstring.generate();

    if(Email != null && Email.length>0 && Email!=undefined){
        const userExixts = await User.findOne({Email : Email});

        if(userExixts===undefined || userExixts === null)       return res.status(200).json({type:'error', message:'no user found.'});
        else if(userExixts.active===true)                       return res.status(200).json({type:'error',message:"this user is already verified. Kindly login."});

        LinkMap.set(link,Email);

        try{
            await MailServer.RegisterEmail(Email,process.env.WebsiteURL+link);
            setTimeout(() => {      //Deleting link after 10 minutes.
                LinkMap.delete(link);
            }, 1000*60*10);
            return res.status(200).json({type:"success","message":"Mail Sent Successfully. Verify and login to proceed."});
            console.log("successs");
        }catch(err){ 
            return res.status(200).json({type:"failed","message":"err"+err});
            console.log("err",err);
        }
   

        return res.status(200).json({type:"success","message":"Mail Sent Successfully. Verify and login to proceed."});
    }
}

const register = async(req,res)=>{
    
    const {Name,Email,Mobile,Password} = req.body;
    
    // console.log(Name,Email,Password,Mobile);
    // let existingUser = null;
    // if(Email!=null && Email.length>0)           existingUser = await User.findOne({Email:Email});
    // else if(Mobile!=null && Mobile.length>0)    existingUser = await User.findOne({Mobile : Mobile});

    // if(existingUser!=null && existingUser!= undefined)      return res.status(200).json({type : "error", 'message':'User Already Exists. Kindly login or use another Email/mobile number to register'});
    // else{


        
        return res.status(200).json({type : "error","message":'something went wrong'});
        // const hashPassword = await hashFunctions.hashing(Password);
        // console.log(hashPassword);
        // const savedUser = await User.create({Email:Email,Mobile:Mobile,Password:hashPassword,Name:Name});
        // console.log(savedUser);

        // let link = await randomstring.generate();
        // while(LinkMap.get(link)!=undefined)       link = await randomstring.generate();


        // if(Email != null && Email.length>0 && Email != undefined){
        //     try {
        //         LinkMap.set(link,Email);
        //        const x =  await MailServer.RegisterEmail(Email,process.env.WebsiteURL+link);
        //         setTimeout(() => {      //Deleting link after 10 minutes.
        //             LinkMap.delete(link);
        //         }, 1000*60*10);
 
        //             return res.status(200).json({type : "error","message":'err...'+x});
                   
        //     } catch (error) {
        //         return res.status(200).json({type : "error","message":'erre'+error});
        //     }
          
        // }else{
        //     return res.status(200).json({type : "error","message":'something went wrong'});
        // }

        // if(savedUser.Email)         return res.status(200).json({type : "success","message":'Your account is created successfully. Redirecting...',tech : 'Email'});
        // else if(savedUser.Mobile)   return res.status(200).json({type:"success","message":'Your account is created successfully. Redirecting...',tech:'Mobile'});
        // else                        return res.status(200).json({type:'error',"Message" : "Something bad happened. Still figuring what."});
    // }
}

module.exports = {register,verification,verificationMail,forgetPassword,forgetMail,checkLinkValidityVerification,checkLinkValidityForget};