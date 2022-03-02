const mongoose = require('mongoose');

const Notififi = new mongoose.Schema({

    Username : {type:String},
    data : [{type : String}],
    Unread : {type:Number, default : 0}
});

module.exports = mongoose.model("Notififi",Notififi);