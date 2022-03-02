const mongoose = require('mongoose');

const PublicRating = new mongoose.Schema({

    Username1 : {type:String},
    Username2 : {type:String},
    Stars : {type:Number}
});

module.exports = mongoose.model("PublicRating",PublicRating);