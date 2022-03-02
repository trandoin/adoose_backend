const Followers = require("../../models/Followers");

const getFollowData = async(req,res)=>{
    const {Username} = req.body;
    if(!Username)       return res.status(200).json({type:'error'});
    const FollowerData = await Followers.findOne({Username : Username});
    return res.status(200).json({type:'success',data:FollowerData});
}

const isUserFollowed = async(req,res)=>{
    const {Username,otherPerson} = req.body;
    const FollowData = await Followers.findOne({Username : Username});
    console.log(FollowData);


    let found = false;
    for(let i = 0;i<FollowData["Following"].length;i++)
    {
        if(FollowData["Following"][i]===otherPerson)
        {
            found = true;
            break;
        }
    }

    if(found)       return res.json({type:'success'});
    else            return res.json({type:'error'});
}

const followUser= async(req,res)=>{
    const {Username,otherPerson} = req.body;
    await Followers.updateOne({Username : Username},{$push:{Following : otherPerson}, $inc:{FollowingCount:1}});
    await Followers.updateOne({Username : otherPerson}, {$inc:{FollowersCount:1}});
    return res.json({type:'success'});
}
const unfollowUser = async(req,res)=>{
    const {Username,otherPerson} = req.body;
    const data = await Followers.findOne({Username:Username});
    console.log(data);
    let i =0;
    for(i = 0;i<data["Following"].length;i++)
    {
        if(data["Following"][i]===otherPerson)
            break;
    }

    if(i<data["Following"].length)      data["Following"].splice(i,1);
    await Followers.updateOne({Username:Username},{Following:data["Following"], $inc:{FollowingCount:-1}});
    await Followers.updateOne({Username:otherPerson},{$inc:{FollowersCount:-1}});
    return res.json({type:'success'});
}

const blockUser = async(req,res) => {
       const {Username,otherPerson} = req.body;
       console.log(req.body);
       await Followers.updateOne({Username : Username},{$push:{Block : otherPerson}, $inc:{BlockCount:1}});
       return res.json({type:'success'});
}

module.exports = {getFollowData,isUserFollowed,unfollowUser,followUser,blockUser};