var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var jsFiles = ['*.js', 'src/**/*.js'];



gulp.task('style', function(){
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe(jscs());
});

gulp.task('inject',function () {

    var wiredep=require('wiredep').stream;

    var Promise = require('any-promise');

    var inject=require('gulp-inject');

    var injectSrc=gulp.src(['./public/css/*.css','./public/js/*.js'],{read:false});

    var injectOptions={

        ignorePath:'/public'

    };

    var options={

        bowerJson:require('./bower.json'),

        directory:'./public/lib',

        ignorePath:'../../public'

    };

    return gulp.src('./src/views/*.html')

    .pipe(wiredep(options))

    .pipe(inject(injectSrc,injectOptions))  //wiredep and gulp-inject are used for inject  all bower packages,html and js files into index.html

    .pipe(gulp.dest('./src/views'));

});



/*gulp.task('inject', function(){
	var wiredep = require('wiredep').stream;
	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		ignorePath: '../../public'
	};

	return gulp.src('./src/views/*.html')
		.pipe(wiredep(options))
		.pipe(gulp.dest('.src/views'));
});*/