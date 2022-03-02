const mongoose = require('mongoose');

const AllRating = new mongoose.Schema({

    Username : {type:String},
    SuperchatStarsAvg : {type:Number,default:0},
    SuperchatRatingCount : {type:Number,default:0},
    SuperChats : [{type:mongoose.Schema.Types.ObjectId,ref:'SuperchatRating'}],

    PublicRatingCount : {type:Number,default:0},
    PublicRatingStarsAvg : {type:Number,default:3}
});

module.exports = mongoose.model("AllRating",AllRating);