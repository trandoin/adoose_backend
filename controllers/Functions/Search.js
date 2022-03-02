const User = require('../../models/User');

let GlobalSearchCache = new Map();

const getSearchedUsers = async(req,res)=>{
    console.log("Finding users... on : ", req.body.text);

    if(!req.body.text || req.body.text.length<3)      return res.status(200).json({data:[]});

    let allPeople1 = [];
    if(GlobalSearchCache.has(req.body.text))    allPeople1 = GlobalSearchCache[req.body.text];
    else        allPeople1 = await User.find({$or:[{Username : {$regex : req.body.text, $options: "i"}},{Name : {$regex : req.body.text, $options: "i"}}], active:true,filled:true}).limit(8);

    if(!allPeople1)
    {
        if(GlobalSearchCache.has(req.body.text))        GlobalSearchCache.delete(req.body.text);
        return res.json(200);
    }

    GlobalSearchCache.set(req.body.text, allPeople1);
    setTimeout(() => {
        if(GlobalSearchCache.has(req.body.text))        GlobalSearchCache.delete(req.body.text);
    }, 10*1000);

    let allPeople = []
    
    for(let i = 0;i<allPeople1.length;i++)
    {
        console.log(allPeople1[i]["Email"]);
        if(allPeople1[i].Username != req.body.Username)     allPeople.push(allPeople1[i]);
    }


    
    return res.status(200).json({data : allPeople});
}


module.exports = {getSearchedUsers};