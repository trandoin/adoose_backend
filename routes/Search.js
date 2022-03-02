const express = require('express');
const {getSearchedUsers} = require('../controllers/Functions/Search');
const router = express.Router();

router.post('/getSearchedUsers',getSearchedUsers);

module.exports = router;