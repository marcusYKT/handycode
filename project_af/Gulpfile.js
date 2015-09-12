//-------------------------------
// Gulp Plugins
//-------------------------------
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint');




//-------------------------------
// Gulp Styles
//-------------------------------
gulp.task('styles', function() {
	return gulp.src('src/scss/main.scss' )

    // compile node-sass (faster), regardless of environment
    .pipe(sass({
        errLogToConsole: true
    }))
    
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('site/css'));
});


//-------------------------------
// Gulp Scripts
//-------------------------------
gulp.task('scripts', function(){
	return gulp.src('src/js/**/*.js')
	  .pipe(jshint())
	  .pipe(jshint.reporter('default'))
	  .pipe(concat('main.js'))
	  .pipe(rename({ suffix: '.min' }))
	  .pipe(uglify())
	  .pipe(gulp.dest('site/js'));
});


//-------------------------------
// Gulp Watch
//-------------------------------
gulp.task('watch', function(){

	//this watches sass
	gulp.watch('src/scss/**/*.scss', ['styles']);
	
	//this watches javascript
	gulp.watch('src/js/**/*.js', ['scripts']);
});


//-------------------------------
// Default Task
//-------------------------------
gulp.task('default', function(){
	gulp.start('styles', 'scripts');
	gulp.start('watch');
});