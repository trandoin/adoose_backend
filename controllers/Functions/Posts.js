const Posts = require('../../models/Posts');
const PostUtil = require('../../models/PostUtil');
const User = require('../../models/User');
const Followers = require('../../models/Followers');

const getPostsData = async(req,res)=>{
    const {Username} = req.body;
    if(!Username)       return res.status(200).json({type : 'error'});
    const result = await Posts.findOne({Username : Username});

    console.log(result);
    let returnedResult = [];
    for(let i = 0;i<result.Post.length;i++)
    {
        const x = await PostUtil.findOne({_id : result.Post[i]});
        returnedResult.push(x);
    }

    return res.status(200).json({type:'success',result:result,returnedResult : returnedResult});
}

const getPostsDataPartial = async(req,res)=>{

    const {Username,start,end} = req.body;

    if(!Username)       return res.status(200).json({type:'error',message:'Some issues happened'});

    const result = await Posts.findOne({Username:Username});

    let PartialResult = [];
    console.log(start,end);
    for(let i = start;i<Math.min(result.PostCount,end);i++)
    {
        const x = await PostUtil.findOne({_id : result.Post[i]});
        PartialResult.push(x);
    } 

    return res.status(200).json({type:'success',result : PartialResult});
}

const getDuniyaPosts = async(req,res)=>{
    
    const {skip} = req.body;
   
    const result = await PostUtil.find().sort({Date:-1}).limit(20).skip(20*skip);
    return res.send(result);
}

const getAllPosts = async(req,res)=>{
    const result = await PostUtil.find();
    console.log(result)
    return res.send(result)
}

const postNewPost = async(req,res)=>{
    console.log(req.body);

    const user = await User.findOne({Username : req.body.data.Username});

    const newPost = await PostUtil.create({
        Username : req.body.data.Username,
        Type:req.body.data.Type,
        Name : user["Name"],
        CollabType:req.body.data.CollabType,
        RequirementType:req.body.data.RequirementType,
        OfferType:req.body.data.OfferType,
        Requirement : req.body.data.Requirement,
        // Date : req.body.data.Date,
        Gender : req.body.data.GenderForPost,
        Location : req.body.data.LocationForPost,
        Language : req.body.data.LanguageForPost,
        Heading : req.body.data.Heading,
        OfferImage : req.body.data.OfferImage,
        ValidFrom : req.body.data.ValidFrom,
        ValidUpto : req.body.data.ValidUpto,
        Description : req.body.data.Description
    });
    
    console.log(newPost);
    
    let zx = null;
    if(user && newPost)
    {
        const postedUser = await Posts.findOne({Username : req.body.data.Username});
        if(!postedUser)     await Posts.create({Username : req.body.data.Username});

        zx = await Posts.updateOne({Username : req.body.data.Username},
            {$push:{Post:{$each:[newPost._id],$position:0}}, $inc:{PostCount:1} })
    }

    if(newPost && zx)   return res.status(200).json({type : 'success', message : 'Post has been created Successfully'});
    else                return res.status(200).json({type : 'error', message:'Some error Occured. Try refreshing again.'});
}

const getPosts = async(req,res)=>{
    const {Username,number} = req.body;
    const userFollowers = await Followers.findOne({Username : Username});
    console.log(userFollowers);
    if(!userFollowers)     return res.json({Posts:[]});
    let listOfFollowers = userFollowers["Following"];
    listOfFollowers.push(Username);
    const Posts = await PostUtil.find({Username : {$in:listOfFollowers}}).sort({Date:-1}).limit(20).skip(20*number);
    return res.json({Posts:Posts});
}

module.exports = {getPostsData,getPostsDataPartial,postNewPost,getPosts,getDuniyaPosts,getAllPosts};