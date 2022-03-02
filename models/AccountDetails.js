const mongoose = require('mongoose')

const AccountDetailsSchema = new mongoose.Schema({
    Recipient_Name:{
        type: String
    },
    Acc_No:{
        type: String,
    },
    IFSC:{
        type: String,
    }
},
    {collection : 'accountdetails'}
)

module.exports = mongoose.model('AccountDetailsRegister',AccountDetailsSchema);