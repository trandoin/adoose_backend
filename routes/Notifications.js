const express = require('express');
const {addNotification,getAllNotifications,readAll} = require('../controllers/Notifications');
const router = express.Router();

router.post('/addNotification',addNotification);
router.post('/getAllNotifications',getAllNotifications);
router.post('/readAll',readAll);
module.exports = router;