const express = require('express');
const router = express.Router();
const requireAuth =require('../middleware/authMiddleware');
const auth=requireAuth.requireAuth;
 
const people = require('../controler/people');

router.post('/:id',auth,people.follow);
router.get('/',auth,people.showPeople);
 

module.exports = router;