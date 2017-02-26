var express = require('express');

var musicRouter = express.Router();

var router = function(nav){

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
			res.render('musicListView', {
			title: 'Musics',
			nav: nav,
			musics: musics
			});
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