const models = require('../models')
const jwt = require('jsonwebtoken');


exports.postComment = async (req, res, next) => {
    const token = req.cookies.jwt;
    const comment = req.body.comment;
    var tweetID = req.params.id;

    const userID = await jwt.verify(token, 'this is secret key', (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            return res.render('home', { error: 'Something Went Worng' });

        } else {
            return decodedToken.id

        }
    });
    var dataArray = [];
    for (var i = 0; i < comment.length; i++) {
        dataArray.push({
            text: comment[i],
            tweet_id: tweetID,
            user_id: userID
        })
    }

    models.commints.bulkCreate(dataArray).then(result => {
        console.log(result)
        return res.redirect('/tweet');
    }).catch(err => {
        console.log(err)
        return res.redirect('/tweet');

    })
    // console.log('/////////////////////', userID, comment, tweetID)
    // return res.redirect('/tweet');

};

