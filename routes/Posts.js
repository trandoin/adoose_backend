const express = require('express');
const { postNewPost,getPosts,getDuniyaPosts,getAllPosts} = require('../controllers/Functions/Posts');
const router = express.Router();


router.post('/postNewPost', postNewPost);
router.post('/getPosts',getPosts);
router.post('/getDuniyaPosts',getDuniyaPosts);
router.get('/getAllPosts',getAllPosts)
module.exports = router;