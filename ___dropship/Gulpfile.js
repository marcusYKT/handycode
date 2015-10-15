//-------------------------------
// Gulp Plugins
//-------------------------------
var pkg				= require('./package.json'),
	gulp 			= require('gulp'),
	gulpif 			= require('gulp-if'),
	srcmaps 		= require('gulp-sourcemaps'),
	sass 			= require('gulp-sass'),
	autoprefixer 	= require('gulp-autoprefixer'),
	cssbeautify 	= require('gulp-cssbeautify'),
	cssminify		= require('gulp-minify-css'),
	bless 			= require('gulp-bless'),
	jsmanifest 		= require('./jsmanifest.json'),
	jshint 			= require('gulp-jshint'),
	concat 			= require('gulp-concat'),
	stripDebug 		= require('gulp-strip-debug'),
	uglify 			= require('gulp-uglify'),
	exec 			= require('child_process').exec,
	argv 			= require('yargs').argv,
	isProduction 	= pkg.environment === 'production';


//-------------------------------
// Gulp Styles
//-------------------------------
gulp.task('styles', function() {
	return gulp.src(pkg.pathToScss + pkg.stylesheetName + '.scss')
		
		// if we're not in production mode, prepare to output sass sourcemaps
		.pipe(gulpif(!isProduction, srcmaps .init()))

		// compile node-sass (faster), regardless of environment
		.pipe(sass({
			errLogToConsole: true
		}))

		// again, if we're not in production mode, output sourcemap
		.pipe(gulpif(!isProduction, srcmaps.write()))

		// autoprefix our output css for full browser support
	    .pipe(autoprefixer('last 8 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))

	    // if we're not in production mode, beautify our css so it's nice and readable (for debugging)
	    .pipe(gulpif(!isProduction, cssbeautify()))

	    // if we _are_ in production mode,
	    // and in case bless won't run,
	    // compress the css
	    .pipe(gulpif(isProduction, cssminify()))

	    // if we _are_ in production mode, bless our css (for full IE 9 support) and compress it
	    .pipe(gulpif(isProduction, bless({
	    	compress:true,
	    	force:true
	    })))

	    // write the css file to our specified destination
	    .pipe(gulp.dest(pkg.pathToDest));
});


//-------------------------------
// Gulp Scripts
//-------------------------------
gulp.task('scripts', function() {
	// prepend our pathToJs to each js file in the manifest (to make our lives easy -- less writing)
	jsmanifest.forEach(function(val, i, a) { a[i] = pkg.pathToJs + val; });
	return gulp.src((jsmanifest))
		// js hinting for code standards
		.pipe(jshint())
		.pipe(jshint.reporter('default'))

		// if we're not in production mode, prepare to output sass sourcemaps
		.pipe(gulpif(!isProduction, srcmaps.init()))

		// concatenate all our js files into one file named shop.js
		.pipe(concat(pkg.javascriptName + '.js'))

		// again, if we're not in production mode, output sourcemap
		.pipe(gulpif(!isProduction, srcmaps.write()))

		// if we are in production mode,
		// strip out our console.logs and debugger statements
		.pipe(gulpif(isProduction, stripDebug()))

		// uglify or beatify our js,
		// depending on environment (production or develop)
		.pipe(uglify({ mangle:isProduction, compress:isProduction }))

		// output our js to our specified destination
		.pipe(gulp.dest(pkg.pathToDest));
});


//-------------------------------
// Gulp Watch
//-------------------------------
gulp.task('watch', function() {
	// scss and js watchers
	gulp.watch(pkg.pathToSrc + '**/*.scss', ['styles']);
	// js hasn't been transfered to gulp yet
	// gulp.watch(pkg.pathToSrc + '**/*.js', ['scripts']);
	gulp.watch('jsmanifest.json', ['scripts']);
});


//-------------------------------
// Gulp Watch
//-------------------------------
//gulp.task('merge', function() {
	// TODO:
	// this task should effectively replace the following tasks:
	// - `theme watch`
	// - `git cherry-pick -n 123456`
	// - `gulp scripts`
	// - `gulp styles`
	// - `git commit`
	// accept commit hash as argument,
	// (format: `gulp merge --commit [myCommitHashGoesHereNoBrackets]`)
	// run theme watch to deploy changed files
	// then cherry-pick commit,
	// and compile css and js (which will deploy them both)
	// exec();
//});


//-------------------------------
// Default Task
//-------------------------------
gulp.task('default', function() {
	gulp.start('styles', 'scripts');
	gulp.start('watch');
});