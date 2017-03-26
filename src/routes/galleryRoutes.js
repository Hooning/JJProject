var express = require('express');
var galleryRouter = express.Router();

var pg = require('pg');

var router = function(nav, pool){
	galleryRouter.route('/')
		.get(function(req, res){
			pool.connect(function(err, client, done){
				if(err){
					return console.error('error fetching client from pool', err);
				}

				var query = client.query('');
				var rows = [];

				query.on('row', function(row, result){
					result.addRow(row);
				});

				// After all data is returned, close connection and return results
			  	query.on('end', function(result) {
				  	//console.log(result.rows);
				  	res.render('galleryListView', {
				  	  	  title: 'Gallery',
						  nav: nav,
						  boards: result.rows
					  });
				    console.log('## ['+ result.rows.length + '] galleries retrieved ##');
			  });
			});
		});
	return galleryRouter;
};

module.exports = router;