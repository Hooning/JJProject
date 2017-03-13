var express = require('express');
var boardRouter = express.Router();

var pg = require('pg');

var router = function(nav, pool){
	boardRouter.route('/')
		.get(function(req, res){
			pool.connect(function(err, client, done) {
			  if(err) {
			    return console.error('error fetching client from pool', err);
			  }
			  
			  var query = client.query('SELECT postid, subject, text, postedbynm, date(dateposted) AS dateposted FROM FREE_BOARD ORDER BY postid desc');
			  var rows = [];

			  query.on('row', function(row, result) {
			      result.addRow(row);
			  });			  
			
			  // After all data is returned, close connection and return results
			  query.on('end', function(result) {
			  	//console.log(result.rows);
			  	res.render('freeBoardListView', {
			  	  	  title: 'Boards',
					  nav: nav,
					  boards: result.rows
				  });
			    console.log('## ['+ result.rows.length + '] boards retrieved ##');
			  });
				  
			});

		});

	return boardRouter;
};

module.exports = router;