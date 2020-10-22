const express = require('express');
const router = express.Router();
const requireAuth =require('../middleware/authMiddleware');
const auth=requireAuth.requireAuth;
 
const tweet = require('../controler/tweet');

router.post('/',auth,tweet.tweetPostData);
router.get('/',auth,tweet.tweetData);

//router.get('/signup', auth.signupForm);

module.exports = router;