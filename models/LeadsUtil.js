const mongoose = require('mongoose');

const LeadsUtil = new mongoose.Schema({
    
    Username : {type : String},
    SuperChatGiver : {type : String},
    Rating : {type : Number},
    Feedback : {type : String},
});

module.exports = mongoose.model("LeadsUtil",LeadsUtil);