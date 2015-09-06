// Include gulp
var gulp = require('gulp');
var usemin = require('gulp-usemin');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');

gulp.task('copy-html-files', function () {
    gulp.src(['./app/**/*.html', '!./app/index.html'], { base: './app' })
    .pipe(gulp.dest('build/'));
});

gulp.task('usemin', function () {
    gulp.src('./app/index.html')
      .pipe(usemin({
          css: [minifyCSS(), 'concat', rev()],
          js: [uglify(), rev()]
      }))
      .pipe(gulp.dest('build/'));
});

gulp.task('build', ['copy-html-files', 'usemin']);