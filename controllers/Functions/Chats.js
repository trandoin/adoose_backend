const Chats = require('../../models/chats');
const User = require('../../models/User');

const getSearchedUser= async(req,res)=>{
    const {Username} = req.body;
    console.log("Finding users...");
    
    const allPeople1 = await User.find({$or:[{Username : {$regex : req.body.text}},{Name : {$regex : req.body.text}}], active:true,filled:true}).limit(8);
    let allPeople = []

    for(let i = 0;i<allPeople1.length;i++){
        if(allPeople1[i]["Username"]!=Username)
            allPeople.push(allPeople1[i]);
    }
    return res.status(200).json({data : allPeople});
}

const getAllChats = async(req,res)=>{
    console.log("finding chats...");

    const {Username} = req.body;
    
    const allChats = await Chats.find({$or : [{P1:Username},{P2:Username}]});
    console.log(allChats)
    return res.status(200).json({chats : allChats});
}

const addChat=async({P1,P2,msg})=>{
    
    let Connector = `${P2}$${P1}`;
    if(P1<P2)       Connector = `${P1}$${P2}`;
    const zx = await Chats.findOne({Connector:Connector});
    if(!zx)     await Chats.create({P1:P1,P2:P2,Connector:Connector});
    const dd = Date.now();
    console.log(dd);
    await Chats.updateOne({Connector:Connector},{$push:{data:{$each : [msg]}},$inc : {Unread : 1}, UnreadFor:P1, last : dd})
}

const allRead = async({P1,P2})=>{
    
    let Connector = `${P2}$${P1}`;
    if(P1<P2)       Connector = `${P1}$${P2}`;
    console.log(Connector);
    const zx = await Chats.findOne({Connector:Connector});
    console.log("What is this ", zx);
    if(!zx)     return ;
    await Chats.updateOne({Connector:Connector},{Unread : 0});
    console.log("Updateing to 0");
}

module.exports = {getAllChats,getSearchedUser,addChat,allRead};