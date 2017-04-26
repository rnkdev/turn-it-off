import gulp from 'gulp';
import bsloader from 'browser-sync';
import sass from 'gulp-sass';

const browserSync = bsloader.create();

// Simple watch task to check for changes in HTML and CSS
// Auto-compile edited SCSS file
gulp.task('serve', () => {
    browserSync.init({
	server: './',
	open: true
    });

    gulp.watch('./index.html').on('change', browserSync.reload);
    gulp.watch('./assets/scss/*.scss', ['scss']);
    gulp.watch('./assets/css/*.css', ['css']);
});

// Inject CSS to browser task
gulp.task('css', () => {
    return gulp.src('./assets/css/*.css')
	.pipe(browserSync.stream());
});

// Compile SASS source to CSS
gulp.task('scss', () => {
    return gulp.src('./assets/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./assets/css/'));
});

// Default Task
gulp.task('default', ['scss','serve']);
