/**
	Gulpfile baseado e adaptado de https://github.com/willianjusten/willianjusten.github.io/
**/
var env         = require('minimist')(process.argv.slice(2)),
	gulp        = require('gulp'),
	plumber     = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	stylus      = require('gulp-stylus'),
	uglify      = require('gulp-uglify'),
	concat      = require('gulp-concat'),
	koutoSwiss  = require('kouto-swiss'),
	prefixer    = require('autoprefixer-stylus'),
	cp          = require('child_process'),
  rename = require('gulp-rename');


/**
 * Starting browser-sync
 */
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './'
		}
	});
});


/**
 * Reload Task
 */
 gulp.task('reload', function() {
 	browserSync.reload();
 });


/**
 * Stylus task
 */
gulp.task('stylus', function(){
		gulp.src('src/styl/main.styl')
		.pipe(plumber())
		.pipe(stylus({
			use:[koutoSwiss(), prefixer()],
			compress: true
		}))
    .pipe(rename('styles.min.css'))
		.pipe(gulp.dest('./css/'))
		.pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('./css/'))
});


/**
 * Javascript Task
 */
gulp.task('js', function(){
	return gulp.src((env.p) ? 'src/js/*.js' : ['src/js/*.js', '!src/js/analytics.js'])
		.pipe(plumber())
		.pipe(concat('functions.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./js/'))
    .pipe(browserSync.reload({stream:true}))
});


/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
	gulp.watch('src/styl/**/*.styl', ['stylus']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch(['*.html', '*.php', 'cms/*.php', 'classes/*.php'], ['reload']);
});


/**
 * Default task, running just `gulp` will compile the stylus,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['js', 'stylus', 'reload', 'browser-sync', 'watch']);
