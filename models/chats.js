const mongoose = require('mongoose');

const chats = new mongoose.Schema({
    
    P1 : {type : String},
    P2 : {type : String},
    Connector : {type:String},       // P1$P2
    data : [{type : String}],
    Unread : {type:Number, default:0},        // P1||p2 $ Msg $ DateTime  => Dope_coder$Hi. This is Dope_coder$2021-08-21T23:08:08.000Z,
    UnreadFor : {type:String},
    last : {type:Number,default:0}
});

module.exports = mongoose.model("Chats",chats);