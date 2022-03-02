const mongoose = require('mongoose');

const Orders = new mongoose.Schema({
    Username1 : {type : String},
    Username2: {type : String},
    NetAmount: {type : Number}
});

module.exports = mongoose.model("Orders",Orders);