const mongoose = require('mongoose');

const Posts = new mongoose.Schema({
    Username : {type : String},
    Post : [{type : mongoose.Schema.Types.ObjectId,ref:'PostUtil'}],
    PostCount : {type : Number,default:0}
});

module.exports = mongoose.model("Posts",Posts);