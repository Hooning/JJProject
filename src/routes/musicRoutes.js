var express = require('express');
var musicRouter = express.Router();

var pg = require('pg');

var router = function(nav, pool){

	var musics = [
		{
			title: 'My room',
			genre: 'Pop Jazz',
			composer: 'Jiyeon Jeon',
			read: false
		},
		{
			title: 'My energy, my motive',
			genre: 'Pop Jazz',
			composer: 'Jiyeon Jeon',
			read: false
		},
		{
			title: 'Superstition',
			genre: 'Pop Funk',
			composer: 'Stieve Wonder',
			read: false
		}
	];

	musicRouter.route('/')
		.get(function(req, res){
			pool.connect(function(err, client, done) {
			  if(err) {
			    return console.error('error fetching client from pool', err);
			  }
			  
			  var query = client.query('SELECT MUSICID, TITLE, COMPOSER FROM MUSICS');
			  
			  var rows = [];

			  query.on('row', function(row, result) {
			      result.addRow(row);
			  });			  
			
			  // After all data is returned, close connection and return results
			  query.on('end', function(result) {
			  	console.log(result.rows);
			  	res.render('musicListView', {
			  	  	  title: 'Musics',
					  nav: nav,
					  musics: result.rows
				  });
			    console.log('## ['+ result.rows.length + '] rows were received ##');
			  });
				  
			});  
			  
	    });		

	musicRouter.route('/:id')
		.get(function(req, res){
			pool.connect(function(err, client, done) {
				var musicid = req.params.id;
				var query = client.query("select * from musics where musicid = $1", [musicid]);

				/*
				query.on('row', function(row, result) {
					result.addRow(row);
				});
				*/

				query.on('end', function(result) {
					console.log(result.rows);
		  			res.render('musicView', {
								title: 'Musics',
								nav: nav,
								music: result
					});
					console.log('## ['+ result.rows.length + '] rows were received ##');
				});
			});
		});

	return musicRouter;

};

module.exports = router;