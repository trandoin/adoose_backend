const Notififi = require('../models/Notififi');

const getAllNotifications = async(req,res)=>{
    const allNotifications = await Notififi.findOne({Username : req.body.Username});
    console.log(allNotifications);
    return res.status(200).json({Notifications : allNotifications});
}

const addNotification = async(req,res)=>{
    const User = await Notififi.findOne({Username : req.body.Username});
    if(!User)        return res.status(200).json({result : "User Does not exist"});
    await Notififi.updateOne({Username : req.body.Username},{$push:{data:{$each : [req.body.message], $position:0}},$inc : {Unread : 1}});
    return res.status(200).json({result : "Sent"});
}

const addNotificationFunction = async(Username,message) =>{
    const User = await Notififi.findOne({Username : Username});
    if(!User)        return res.status(200).json({result : "User Does not exist"});
    await Notififi.updateOne({Username : Username},{$push:{data:{$each : [message], $position:0}},$inc : {Unread : 1}});
    return ;
}

const readAll = async(req,res)=>{
    await Notififi.updateOne({Username:req.body.Username},{Unread:0});
    return res.status(200);
}

module.exports = {getAllNotifications, addNotification,readAll,addNotificationFunction};