const express = require('express');

const {postPublicRating,getPublicRating} = require('../controllers/Rating')
const router = express.Router();

// router.post('/addNotification',addNotification);
// router.post('/getAllNotifications',getAllNotifications);
// router.post('/readAll',readAll);

router.post('/postPublicRating',postPublicRating);
router.post('/getPublicRating',getPublicRating);

module.exports = router;