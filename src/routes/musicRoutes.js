var express = require('express');
var musicRouter = express.Router();

var pg = require('pg');

var router = function(nav, pool){

	//Not in Use ( Using PostgreSQL )
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
			  	//console.log(result.rows);
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
		.all(function(req,res,next){
			pool.connect(function(err, client, done) {
				var musicid = req.params.ids
				var query = client.query('select * from musics where musicid = $1', [musicid]);

				query.on('row', function(row, result) {
					result.addRow(row);
				});
				
				query.on('end', function(result) {
					//console.log(result.rows);
					if(result.rows.length === 0){
						res.status(404).send('Not Found');
					}else{
			  			req.music = result.rows[0];
			  			next();
		  				console.log('## musicid : '+ result.rows[0].musicid + ' - exists ##');
					}
				});
			});
		})
		.get(function(req, res){
			res.render('musicView', {
						title: 'Musics',
						nav: nav, 
						music: req.music
			});
		});

	return musicRouter;

};

module.exports = router;