const mongoose = require('mongoose');

const Follower = new mongoose.Schema({
    
    Username : {type : String},
    FollowersCount : {type : Number},
    BlockCount : {type : Number},
    Block : [{type : String}],
    FollowingCount : {type : Number},
    Following : [{type : String}],
});

module.exports = mongoose.model("Follower",Follower);