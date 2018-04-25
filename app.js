var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var cool = require('cool-ascii-faces');
var mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 5000;

var nav = [{
        Link: '/Music',
        Text: 'MUSIC'
		   },
    {
        Link: '/Gallery',
        Text: 'GALLERY'
		   },
    {
        Link: '/Video',
        Text: 'VIDEO'
		   }];

// Connect to MongoDB Server
mongoose.connect(process.env.MONGODB_URI);

// Define Model
var Menus = require('./models/menus');

var musicRouter = require('./src/routes/musicRoutes')(nav, pool);
var galleryRouter = require('./src/routes/galleryRoutes')(nav, pool);
var videoRouter = require('./src/routes/videoRoutes')(nav, pool);
var authRouter = require('./src/routes/authRoutes')(nav, pool);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', '.ejs');

app.use('/Music', musicRouter);
app.use('/Gallery', galleryRouter);
app.use('/Video', videoRouter);
app.use('/Auth', authRouter);


app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
                Link: '#introduction',
                Text: 'ABOUT'
		 },
            {
                Link: '#music',
                Text: 'MUSIC'
		 },
            {
                Link: '#gallery',
                Text: 'GALLERY'
		 },
            {
                Link: '#video',
                Text: 'VIDEO'
		 },
            {
                Link: '#contact',
                Text: 'CONTACT'
		 }]
    });
});

app.get('/cool', function (req, res) {
    res.send(cool());
});

// GET ALL MENUS
app.get('/menus', function(req,res){
    Menus.find(function(err, menus){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(menus);
    })
})

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});
