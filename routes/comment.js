const express = require('express');
const router = express.Router();
const requireAuth =require('../middleware/authMiddleware');
const auth=requireAuth.requireAuth;
 
const comment = require('../controler/comment');

router.post('/:id',auth,comment.postComment);
//router.get('/',auth,people.showPeople);
 

module.exports = router;