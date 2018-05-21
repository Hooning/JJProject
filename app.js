var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var cool = require('cool-ascii-faces');
var mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 3000;

// Connect to MongoDB Server
// console.log(process.env.MONGODB_URI);
mongoose.connect('mongodb://hoontime:gns0524@ds257589.mlab.com:57589/heroku_0x1km08f');

// Define Model
var Menus = require('./models/menus');

//var musicRouter = require('./src/routes/musicRoutes')(nav, pool);
//var galleryRouter = require('./src/routes/galleryRoutes')(nav, pool);
//var videoRouter = require('./src/routes/videoRoutes')(nav, pool);
//var authRouter = require('./src/routes/authRoutes')(nav, pool);

app.use(express.static('public'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', '.ejs');

app.get('/', function (req, res) {
    Menus.find(function(err, menus){
        if(err){
          return res.status(500).send({error: 'database failure'});  
        } 
        
        res.render('index', {
            welcome: 'Welcome To Jazzydus Music!',
            whatAbout: 'ALL ABOUT JJ',
            nav: menus
        });
        
    }).sort('menu_order');
    
});

app.get('/cool', function (req, res) {
    res.send(cool());
});

// GET ALL MENUS
app.get('/menus', function(req,res){
    Menus.find(function(err, menus){
        if(err){
          return res.status(500).send({error: 'database failure'});  
        } 
        res.json(menus);
    });
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});
