/**
 * @author  Jozef Butko
 * @url		  www.jozefbutko.com/resume
 * @date    March 2015
 * @license MIT
 *
 * AngularJS Boilerplate: Build, watch and other useful tasks
 *
 * The build process consists of following steps:
 * 1. clean /_build folder
 * 2. compile SASS files, minify and uncss compiled css
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. minify and copy all JS files
 * 7. copy fonts
 * 8. show build folder size
 *
 */
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    jshint          = require('gulp-jshint'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    $               = require('gulp-load-plugins')(),
    del             = require('del'),
    runSequence     = require('run-sequence');

    gulp.task('default', ['watch']);

    gulp.task('jshint', function() {
      return gulp.src(['public/app/**/*.js', 'backend/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
    });

    gulp.task('build-css', function() {
      return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/styles'));
    });

    gulp.task('watch', function() {
      gulp.watch('public/app/**/*.js', ['jshint']);
      gulp.watch('src/scss/**/*.scss', ['build-css']);
    });
