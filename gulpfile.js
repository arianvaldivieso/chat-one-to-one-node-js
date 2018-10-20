var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static server
gulp.task('browser-sync',['sass'], function() {
  browserSync.init({
      server: './'
  });

  gulp.watch("./public/scss/*.scss", ['sass']);
  gulp.watch("./*.html").on('change', browserSync.reload);
  gulp.watch("./public/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src("./public/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./public/css/"))
    .pipe(browserSync.stream());
});

gulp.task('default',['browser-sync']);