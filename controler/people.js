const models = require('../models')
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");



exports.showPeople = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'this is secret key', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                return res.render('home', { error: 'Something Went Worng' });

            } else {
                models.users.findAll(
                    {
                        where: {
                            id: { [Op.ne]: decodedToken.id },
                        }
                    }

                ).then(people => {

                    return res.render('home', { people: people });

                }).catch(err => {
                    console.log(err)
                    return res.render('home', { error: 'Something Went Worng' });
                })
            }
        });
    } else {
        return res.render('home', { error: 'Authentication Failed', login_info: true });

    }


};



exports.follow = async (req, res, next) => {
    const token = req.cookies.jwt;
    var followingID = req.params.id;

    const followerID = await jwt.verify(token, 'this is secret key', (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            return res.render('home', { error: 'Something Went Worng' });

        } else {
            return decodedToken.id

        }
    });

    models.followers.findOne({
        where: {

            follower_id: followerID,
            following_id: followingID
        }
    }).then(userDoc => {
            if (userDoc) {
                return res.render('home', { error: 'Already follow' });
            }
            else {
                models.followers.create({
                    follower_id: followerID,
                    following_id: followingID,

                }).then(result => {
                    console.log(result)
                    return res.redirect('/');
                }).catch(err => {
                    console.log(err)
                    return res.redirect('/');
                    
                })
            }

        })
        .catch(err => {
            console.log(err)
            return res.redirect('/');
            
        })

};

