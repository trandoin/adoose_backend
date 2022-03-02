const Leads = require("../../models/Leads");
const LeadsUtil = require("../../models/LeadsUtil");
const AllRating = require("../../models/AllRating")

const getLeadsData = async(req,res)=>{
    const {Username} = req.body;

    if(!Username)       return res.status(200).json({type : 'error',message : "Some issues happened."});

    const result = await Leads.findOne({Username : Username});

    return res.status(200).json({type : 'success',result : result});
}

const getLeadsDataPartial = async(req,res)=>{

    const {Username,start,end} = req.body;
    if(!Username)       return res.status(200).json({type : 'error',message : "Some issues happened."});

    const result = await Leads.findOne({Username : Username});

    let PartialResult = [];
    for(let i = start;i<Math.min(result.LeadsList.length,end);i++)
    {
        const x = await LeadsUtil.find({Username : Username, _id : result.LeadsList[i]});
        console.log(x)
        PartialResult.push(x);
    }
    return res.status(200).json({type:'success',result : PartialResult});
}

const saveLeadsData = async(req,res)=>{
    console.log(req.body)
    const Username = req.body.Username2;
    const SuperChatGiver = req.body.Username1;
    const Rating = req.body.rating;
    const Feedback = req.body.description;

    const data = await LeadsUtil.create({Username: Username,SuperChatGiver: SuperChatGiver,Rating: Rating,Feedback: Feedback})
    const _id = data._id;
    const LeadUser = await Leads.findOne({Username : Username});
    if(!LeadUser)     await Leads.create({Username : req.body.data.Username});

    const LeadData = await Leads.findOne({Username : Username});
    if(LeadData.LeadsAverageRating == 0) {
        await AllRating.updateOne({Username : Username},
            {$set:{SuperchatStarsAvg: Rating,SuperchatRatingCount:1} })
        await Leads.updateOne({Username : Username},
            {$push:{LeadsList:{$each:[_id],$position:0}},$set:{LeadsAverageRating: Rating}, $inc:{LeadsCount:1} })
    } else {
        const NewAverageRating = (LeadData.LeadsAverageRating * LeadData.LeadsCount + Rating)/(LeadData.LeadsCount + 1)
        await AllRating.updateOne({Username : Username},
            {$set:{SuperchatStarsAvg: NewAverageRating,SuperchatRatingCount: LeadData.LeadsCount + 1} })
    await Leads.updateOne({Username : Username},
        {$push:{LeadsList:{$each:[_id],$position:0}},$set:{LeadsAverageRating: NewAverageRating}, $inc:{LeadsCount:1} })
    }
}




module.exports = {getLeadsData,getLeadsDataPartial,saveLeadsData};