const express = require('express');
const {getAllChats,getSearchedUser} = require('../controllers/Functions/Chats');
const router = express.Router();

router.post('/getAllChats',getAllChats);
router.post('/getSearchedUser',getSearchedUser);

module.exports = router;