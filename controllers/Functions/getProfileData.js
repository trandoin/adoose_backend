const Followers = require('../../models/Followers');
const Posts = require('../../models/Posts');
const User = require('../../models/User');
const Leads = require('../../models/Leads');
const AllRating = require('../../models/AllRating');
const AccountDetails = require("../../models/AccountDetails");
const LeadsUtil = require("../../models/LeadsUtil");
const PostUtil = require("../../models/PostUtil");
const Notififi = require("../../models/Notififi");
const PublicRating = require("../../models/PublicRating");
const Orders = require("../../models/Orders");
const Chats = require("../../models/chats");

const getProfileData = async(req,res)=>{
    const {Email,Mobile} = req.body;
    let user = null;
    if(Email!=null)     user = await User.findOne({Email : Email});
    else if(Mobile!= null)  user = await User.findOne({Mobile : Mobile});

    if(!user)         return res.status(200).json({type:'error',message : "Some error occured. Try again..."});
    else{
        user.Password = null;
        user._id = null;
        return res.status(200).json({type :'success',message : "User found", user : user});
    }
}

const getOthersProfileData = async(req,res)=>{
    const {Username} = req.body;
    let user = null;
    if(Username)        user = await User.findOne({Username : Username});
    if(!user)       return res.status(200).json({type:'error',message:'This user is not found'});
    else            return res.status(200).json({type:'success',user:user,message:'success'});
}

const checkUsernameAvailability = async(req,res)=>{
    const Username = req.body.username;
    const isUserPresent = await User.findOne({Username : Username});

    const Email = req.body.Email;
    const Mobile = req.body.Mobile;

    if(isUserPresent)
    {
        if(Email!=null && Email!=undefined && isUserPresent.Email!=null && isUserPresent.Email!=undefined && isUserPresent.Email==Email)                   return res.status(200).json({type:'success'});
        else if(Mobile!=null && Mobile!=undefined && isUserPresent.Mobile!=null && isUserPresent.Mobile!=undefined && isUserPresent.Mobile==Mobile)        return res.status(200).json({type:'success'});
        else                    return res.status(200).json({type:'error'});
    }
    else
    {
        return res.status(200).json({type:'success'});
    }
}

const saveUserName = async(req,res)=>{
    const {Username,Email,Mobile} = req.body;
    let userExist = null;
    if(Email!=null && Email!=undefined)             userExist = await User.findOne({Email : Email});
    else if(Mobile!=null && Mobile!=undefined)      userExist = await User.findOne({Mobile : Mobile});
    else                                            return res.status(200).json({type:'error',message:"Logging off..."});
    
    await User.updateOne({_id : userExist._id}, {Username : Username,filledCount:2});
    return res.status(200).json({type:'success'});
}

const saveGender = async(req,res)=>{
    const {Username,Gender} = req.body;
    const userExist = await User.updateOne({Username : Username}, {Gender : Gender,filledCount:3});
    if(userExist!=null && userExist!=undefined)     return res.status(200).json({type:'success'});
    else                                            return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
}

const saveProfession = async(req,res)=>{
    const {Username,Profession} = req.body;
    const userExist = await User.updateOne({Username : Username}, {Profession : Profession,filledCount:4});
    if(userExist!=null && userExist!=undefined)     return res.status(200).json({type:'success'});
    else                                            return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
}

const saveAbout = async(req,res)=>{
    const {Username,About} = req.body;
    const userExist = await User.updateOne({Username : Username}, {About : About,filledCount:50});
    if(userExist!=null && userExist!=undefined)     return res.status(200).json({type:'success'});
    else                                            return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
}

const saveBriefDetails = async(req,res)=>{
    const {Username,BriefDetails} = req.body;
    const userExist = await User.updateOne({Username : Username}, {BriefDetails : BriefDetails,filledCount:5});
    if(userExist!=null && userExist!=undefined)     return res.status(200).json({type:'success'});
    else                                            return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
}

const saveWork = async(req,res)=>{

    const {Username,work,workImage} = req.body;
    const userExist = await User.updateOne({Username : Username}, {work:work,workImage:workImage,filledCount:6});
    if(userExist!=null && userExist!=undefined)     return res.status(200).json({type:'success'});
    else                                            return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
}

const saveLanguage = async(req,res)=>{
    const {Username,language} = req.body;
    const userExist = await User.updateOne({Username : Username}, {Language:language,filledCount:7});
    if(userExist!=null && userExist!=undefined)     return res.status(200).json({type:'success'});
    else                                            return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
}

const saveLocation = async(req,res)=>{
    const {Username,Location} = req.body;
    const userExist = await User.updateOne({Username : Username}, {Location:Location,filledCount:8});
    if(userExist!=null && userExist!=undefined)     return res.status(200).json({type:'success'});
    else                                            return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
}

const saveSocialMedia = async(req,res)=>{
    const {Username} = req.body;
    const userExist = await User.updateOne({Username : Username},{filledCount : 9});
    if(userExist)       return res.status(200).json({type : 'success'});
    else                return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
}

const saveProfileImage = async(req,res)=>{
    const {Username,ProfileImage} = req.body;
    const userExist = await User.updateOne({Username : Username},{ProfileImage : ProfileImage,filledCount : 10});

    if(userExist)       return res.status(200).json({type : 'success'});
    else                return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
}


const addWorkImage = async(req,res)=>{
    const {Username,Image} = req.body;
    const user = await User.findOne({Username : Username});
    if(user)
    {
        user.workImage.push(Image);
        const userExists = await User.updateOne({Username, Username}, {workImage : user.workImage});
        if(userExists)       return res.status(200).json({type : 'success'});
        else                return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
    }
    else
    {
        return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
    }
}

const saveAccountType = async(req,res)=>{
    
    const {Username,AccountType} = req.body;
    const userExist = await User.updateOne({Username : Username},{AccountType : AccountType,filledCount : 11, filled : true});
    if(userExist){

        //  Add other DB's 
        // Follower DB
        await Followers.create({Username : Username, FollowersCount : 0, FollowingCount : 0,BlockCount : 0});
        await Posts.create({Username : Username,PostCount : 0});
        await Leads.create({Username : Username,LeadsCount : 0,LeadsAverageRating : 0});
        await AllRating.create({Username:Username});

        return res.status(200).json({type : 'success'});
    }
    else                return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});

}

const addFee = async(req,res) => {
    const {Username,Fee} = req.body;
    const user = await User.findOne({Username : Username});
    if(user)
    {
        const data = await User.updateOne({Username : Username},{$set:{Fee : Fee}});
        if(data)       return res.json(data);
        else                return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
    }
    else
    {
        return res.status(200).json({type:'error',message:"Some error occured. Redirecting..."});
    }
}

const deleteProfile = async(req,res) => {
    const Username = req.body.Username;
    const find_acc = await AccountDetails.findOne({Recipient_Name: Username});
    if(find_acc) {
        await AccountDetails.deleteMany({Recipient_Name: Username})
    }
    const find_order = await Orders.findOne({Username2: Username})
    if(find_order) {
        await Orders.deleteMany({Username2:Username})
    }
    const find_chats = await Chats.findOne({$or : [{P1:Username},{P2:Username}]});
    if(find_chats) {
        await Chats.deleteMany({$or : [{P1:Username},{P2:Username}]})
    }
   await AllRating.findOneAndDelete({Username: Username})
   const find_postutil = await PostUtil.find({Username: Username})
   if(find_postutil) {
       await PostUtil.deleteMany({Username: Username})
       await Posts.findOneAndDelete({Username: Username})
   }
   const find_publicrating = await PublicRating.findOne({Username: Username})
   if(find_publicrating) {
    await PublicRating.deleteMany({Username: Username})
   }
   const find_leadsutil = await LeadsUtil.findOne({Username: Username})
   if(find_leadsutil) {
    await LeadsUtil.deleteMany({Username: Username})
    await Leads.findOneAndDelete({Username: Username})
   }
   const find_notification = await Notififi.findOne({Username: Username})
   if(find_notification) {
       await Notififi.findOneAndDelete({Username: Username})
   }
 
   const data = await Followers.findOne({Username: Username})
   console.log(data.Following)
   for (const ele of data.Following) {
       console.log(ele)
   }

   await User.findOneAndDelete({Username: Username})
}

module.exports = {addWorkImage,getOthersProfileData,saveAccountType,saveProfileImage,saveSocialMedia,getProfileData,checkUsernameAvailability,saveUserName,saveLocation,saveGender,saveProfession,saveAbout,saveBriefDetails,saveWork,saveLanguage,addFee,deleteProfile};