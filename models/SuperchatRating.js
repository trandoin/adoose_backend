const mongoose = require('mongoose');

const SuperchatRating = new mongoose.Schema({

    Username1 : {type:String},
    Username2 : {type:String},
    Stars :  {type:Number},
    Comment : {type:String}
});

module.exports = mongoose.model("SuperchatRating",SuperchatRating);