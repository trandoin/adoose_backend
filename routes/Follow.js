const express = require('express');
const router = express.Router();
const {isUserFollowed,followUser,unfollowUser,blockUser} = require('../controllers/Functions/Follow');

router.post('/isUserFollowed',isUserFollowed);
router.post('/followUser',followUser);
router.post('/unfollowUser',unfollowUser);
router.post('/block',blockUser)
module.exports = router;