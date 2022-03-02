const mongoose = require('mongoose');

const PostUtil = new mongoose.Schema({
    
    Username : {type : String},         // userid
    Name : {type:String},
    Type : {type : String},             // Collab, Requirement,Offer

    CollabType : {type : String,default:''},       // Promotion,sponsorship
    RequirementType : {type : String,default:''},  // Professional, Accesories
    OfferType : {type : String,default:''},        // Offer, +1

    Requirement : {type : String},      // Text
    Date : {type : Date, default : Date.now},
    Gender : {type : String},
    Location : [{type : String}],
    Language : [{type : String}],
    Heading : {type : String},
    OfferImage : {type : String},
    ValidFrom : {type : Date},
    ValidUpto : {type : Date},
    Description : {type : String},
});

module.exports = mongoose.model("PostUtil",PostUtil);