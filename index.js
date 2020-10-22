var express = require('express');
var bodyParser = require("body-parser");
const sequelize =require('./config/config.json')
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth');
const tweet =require('./routes/tweet')
const people =require('./routes/people')
const comment =require('./routes/comment')

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.json());


app.set('view engine', 'ejs');


 
app.use('/auth', auth);
app.use('/tweet',tweet);
app.use('/people',people);
app.use('/comment',comment)
 


app.get('/',(req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {

        res.render('home', { login_info:false });
    }
    else{
        res.render('home', { login_info:true });
    }
    
    
});

app.get('/*', (req, res, next) => {
   
    res.send("page not found");
    
});

// sequelize.sync().then(
//     result => {
//         console.log("table created");
        
//     }
// ).catch(err =>{
//     console.log(err);
// })
app.listen(3000, function () {
     
    console.log('Example app listening on port 3000!')
}); 

 