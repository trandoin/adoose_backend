const express = require('express');
const {login,getAllUsers} = require('../controllers/login');
const {register,verification,verificationMail,forgetPassword,forgetMail,checkLinkValidityForget,checkLinkValidityVerification} = require('../controllers/register');
const { verifyJWT } = require('../middlewares/verifyJWT');
const router = express.Router();


router.post('/login',login);
router.post('/register',register);
router.post('/verification',verification);
router.post('/verificationMail',verificationMail);
router.post('/forgetPassword',forgetPassword);
router.post('/checkLinkValidityForget',checkLinkValidityForget);
router.post('/checkLinkValidityVerification',checkLinkValidityVerification);
router.post('/setnewpassword',forgetMail);
router.get('/getAllUsers',getAllUsers)
module.exports = router;

