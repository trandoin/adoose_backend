const express = require("express");
const router = express.Router();

const {AddAccountDetails} = require('../controllers/login')

router.post('/details',AddAccountDetails)

module.exports = router