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

// PostgreSQL Setting Start //

var pg = require('pg');
 
// create a config to configure both pooling behavior 
// and client options 
// note: all config is optional and the environment variables 
// will be read if the config is not present 
var config = {
  user: 'postgres', //env var: PGUSER 
  database: 'JJ_WEB_Project', //env var: PGDATABASE 
  password: 'admin001', //env var: PGPASSWORD 
  host: 'localhost', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};

//this initializes a connection pool 
//it will keep idle connections open for a 30 seconds 
//and set a limit of maximum 10 idle clients 
var pool = new pg.Pool(config);
 
// to run a query we can acquire a client from the pool, 
// run a query on the client, and then return the client to the pool 
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::text AS number', ['## pool.connect Ok ##'], function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
 
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
    //output: ## pool.connect Ok ## 
  });
});
 
pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool 
  // the pool itself will emit an error event with both the error and 
  // the client which emitted the original error 
  // this is a rare occurrence but can happen if there is a network partition 
  // between your application and the database, the database restarts, etc. 
  // and so you might want to handle it and at least log it out 
  console.error('idle client error', err.message, err.stack);
});

// PostgreSQL Setting End //

var musicRouter = require('./src/routes/musicRoutes')(nav, pool);

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