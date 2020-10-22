const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'this is secret key', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
       return res.render('login');
      } else {
        console.log(decodedToken);
         
        next();
      }
    });
  } else {
    return res.render('login');
  }
};


const reqAuth = (req, res, next) => {
  
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'this is secret key', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.render('home', { error: 'Please login for more' });
      } else {
        console.log(decodedToken);
        return res.render('home', { error: 'Already login' });
         
      }
    });
  } else {
    next();
    
  }
};

module.exports =
{
  requireAuth,
  reqAuth,
} 
 