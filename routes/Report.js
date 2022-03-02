const express = require('express');

const {report} = require('../controllers/report')
const router = express.Router();


router.post('/account',report);

module.exports = router;