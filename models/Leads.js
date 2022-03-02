const mongoose = require('mongoose');
const LeadsUtil = require('./LeadsUtil');

const Leads = new mongoose.Schema({
    
    Username : {type : String},
    LeadsCount : {type : Number},
    LeadsList : [{
        type : mongoose.Schema.Types.ObjectId,
        Ref : 'LeadsUtil'
    }],
    LeadsAverageRating : {type : Number}
});

module.exports = mongoose.model("Leads",Leads);