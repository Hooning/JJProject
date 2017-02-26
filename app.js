var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

var nav = [{
			Link:'/Music', 
			Text: 'MUSIC'
		   },
		   {
		 	Link: '/Board',
		    Text: 'Board'
		   },
		   {
		 	Link: '/About',
		    Text: 'ABOUT'
		   }];

var musicRouter = require('./src/routes/musicRoutes')(nav);

app.use(express.static('public'));
app.set('views','./src/views');

// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));

//app.set('view engine', '.hbs');

app.set('view engine', '.ejs');

app.use('/Music', musicRouter);

app.get('/', function(req, res) {
	res.render('index', {
		title: 'Hello from render',
		nav: 
		[{
			Link:'/Music', 
			Text: 'MUSIC'
		 },
		 {
		 	Link: '/Board',
		    Text: 'Board'
		 },
		 {
		 	Link: '/About',
		    Text: 'ABOUT'
		 }]}
		 );
});

app.get('/books', function(req, res) {
	res.send('Hello Books.');
});

app.listen(port, function(err){
	console.log('running server on port ' + port);
});