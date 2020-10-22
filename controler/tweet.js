const models = require('../models')
const jwt = require('jsonwebtoken');


exports.tweetData = (req, res, next) => {

    models.tweets.findAll(
        {
            include: [
                {
                    model: models.users,
                    required: true,//inner join
                    // raw: true
                },
                // {
                //     model: models.commints,
                //     //required: true,
                // }

            ],
            raw: true,
            nest: true,
        },

    ).then(tweetData => {
        models.tweets.findAll(
            {
                include: [
                     
                    {
                        model: models.commints,
                        required: true,
                    }
    
                ],
                raw: true,
                nest: true,
            },
    
        ).then(commentData => {
            
            console.log(commentData)
            console.log(tweetData)
            return res.render('home', { postData: tweetData ,async: true});
    


        }).catch(err => {
            console.log(err)
            return res.render('home', { error: 'Something Went Worng' });
        })
   

    }).catch(err => {
        console.log(err)
        return res.render('home', { error: 'Something Went Worng' });
    })


};



exports.tweetPostData = (req, res, next) => {

    const tweet = req.body.tweet;
    console.log(tweet);

    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'this is secret key', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                return res.render('home', { error: 'Something Went Worng' });

            } else {
                var dataArray = [];
                for (var i = 0; i < tweet.length; i++) {
                    dataArray.push({
                        text: tweet[i],
                        user_id: decodedToken.id
                    })
                }
                models.tweets.bulkCreate(
                    dataArray
                )
                    .then(reslt => {
                        console.log(reslt);
                        return res.render('home', { error: 'Post successfull' });
                    }).catch(err => {
                        console.log(err);
                        return res.render('home', { error: 'Something Went Worng' });
                    });


            }
        });
    } else {
        return res.render('home', { error: 'Authentication Failed', login_info: true });

    }



};

