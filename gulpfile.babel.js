import gulp from 'gulp';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import shell from 'gulp-shell';

gulp.task('lib', () => {
  gulp.src('lib/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(shell(['yarn example']))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', ['lib'], () => {
  gulp.watch('lib/*.js', ['lib']);
});
