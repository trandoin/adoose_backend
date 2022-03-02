const express = require('express');
const router = express.Router();
const {AddOrders,GetOrders} = require('../controllers/Orders');

router.post('/add',AddOrders)
router.post('/GetOrders',GetOrders)

module.exports = router