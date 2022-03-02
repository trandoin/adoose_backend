const mongoose = require('mongoose');

const User = new mongoose.Schema({
    Email : {type : String},
    Username : {type : String},
    Mobile : {type : String},
    Password : {type : String},
});

module.exports = mongoose.model("guestusers",User);