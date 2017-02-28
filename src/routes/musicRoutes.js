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
			  var query = client.query('SELECT TITLE, COMPOSER FROM MUSICS');

			  var rows = [];

			  query.on('row', function(row, res) {
				    rows.push(row);
				});
			    
			  // After all data is returned, close connection and return results
			  query.on('end', function(result) {
			    return res.render('musicListView', 
			                       {
			  						title: 'Musics',
									nav: nav,
									musics: result
								   });
			    });


			  })
	    });		

	musicRouter.route('/:id')
		.get(function(req, res){
			var id = req.params.id;
			res.render('musicView', {
			title: 'Musics',
			nav: nav,
			music: musics[id]
			});
		});

	return musicRouter;

};

module.exports = router;