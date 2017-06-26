var express = require('express');
var videoRouter = express.Router();

var pg = require('pg');

var router = function(nav, pool){
	videoRouter.route('/')
		.get(function(req, res){
			pool.connect(function(err, client, done) {
			  if(err) {
			    return console.error('error fetching client from pool', err);
			  }
			  
			  var query = client.query("SELECT POSTID, SUBJECT, POSTEDBYNM, TO_CHAR(DATEPOSTED, 'YYYY-MM-DD') AS DATEPOSTED FROM FREE_BOARD ORDER BY POSTID DESC");
			  var rows = [];

			  query.on('row', function(row, result) {
			      result.addRow(row);
			  });			  
			
			  // After all data is returned, close connection and return results
			  query.on('end', function(result) {
			  	//console.log(result.rows);
			  	res.render('videoListView', {
			  	  	  title: 'Videos',
					  nav: nav,
					  videos: result.rows
				  });
			    console.log('## ['+ result.rows.length + '] videos retrieved ##');
			  });
				  
			});

		});

	return videoRouter;
};

module.exports = router;