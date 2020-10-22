const express = require('express');
const router = express.Router();
const requireAuth =require('../middleware/authMiddleware');
const authantication=requireAuth.reqAuth;
 
const auth = require('../controler/auth');

router.get('/signup',authantication, auth.signupForm);
router.get('/login',authantication, auth.loginForm);
//router.post('/signup', signup.postSignupData);

router.post('/signup',auth.postSignupData);
router.post('/login',auth.postLoginData);

router.get('/logout', auth.logout);


module.exports = router;