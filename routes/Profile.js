const express = require('express');
const router = express.Router();

const {addWorkImage,getOthersProfileData,saveAccountType,saveProfileImage,saveSocialMedia,getProfileData,checkUsernameAvailability,saveUserName,saveGender,saveProfession,saveAbout,saveBriefDetails,saveWork,saveLocation,saveLanguage,addFee,deleteProfile} = require('../controllers/Functions/getProfileData');
const {getLeadsDataPartial,getLeadsData,saveLeadsData} = require('../controllers/Functions/Leads');
const {getPostsDataPartial,getPostsData} = require('../controllers/Functions/Posts');
const {getFollowData} = require('../controllers/Functions/Follow');

router.post('/getProfileData',getProfileData);
router.post('/checkUsernameAvailability',checkUsernameAvailability);
router.post('/saveUserName',saveUserName);
router.post('/saveGender',saveGender);
router.post('/saveProfession',saveProfession);
router.post('/saveBriefDetails',saveBriefDetails);
router.post('/saveAbout',saveAbout);
router.post('/saveWork',saveWork);
router.post('/saveLanguage',saveLanguage);
router.post('/saveLocation',saveLocation);
router.post('/saveSocialMedia',saveSocialMedia);
router.post('/saveProfileImage',saveProfileImage);
router.post('/saveAccountType',saveAccountType);
router.post('/addWorkImage',addWorkImage);
router.post('/getOthersProfileData',getOthersProfileData);
router.post('/addFee',addFee)

router.post('/saveLeadsData',saveLeadsData)
router.post('/getLeadsData',getLeadsData);
router.post('/getLeadsDataPartial',getLeadsDataPartial);

router.post('/getPostsData',getPostsData);
router.post('/getPostsDataPartial',getPostsDataPartial);

router.post('/getFollowData',getFollowData);
router.post('/delete',deleteProfile)

module.exports = router;