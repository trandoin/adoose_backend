const mongoose = require('mongoose');

const User = new mongoose.Schema({
    Name : {type : String},
    Email : {type : String},
    Username : {type : String},
    Mobile : {type : String},
    Password : {type : String},
    AccountType : {type : String,default : "Individual"},
    Gender : {type : String},
    Location : [{type : String}],
    Language : [{type : String}],
    Profession : [{type : String}],
    About : {type : String,default:""},
    Notes : {type : String},
    Card : {type : String},
    ProfileImage : {type:String,default:""},
    workImage : [{type:String}],
    work: [{type : String}],         // [title,description,[Link]]
    
    BriefDetails : {type:String, default:""},
    Stars:{type:Number,default:3},
    SocialMedia:[{type:String}],
    AboutContent : {type:String},
    active : {type : Boolean,default:false},
    filled : {type : Boolean,default : false},
    filledCount : {type : Number,default : 0},
    Fee: {type : Number,default : 0}
});

module.exports = mongoose.model("User",User);