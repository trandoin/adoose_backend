const Orders = require("../models/Orders");

const AddOrders = async(req,res) => {
   const {Username1,Username2,NetAmount} = req.body;
   const data = await Orders.create({
       Username1: Username1,
       Username2: Username2,
       NetAmount: NetAmount
   })
   return res.send(data);
}

const GetOrders = async(req,res) => {
    const Username1 = req.body.Username;

    const result = await Orders.find({Username1:Username1});
    return res.send(result)

}

module.exports = {AddOrders,GetOrders}

