const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const pug = require('gulp-pug')
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()

//scss to css
function style() {
	return gulp
		.src('assets/scss/**/*.scss', { sourcemaps: true })
		.pipe(
			sass({
				outputStyle: 'compressed',
			}).on('error', sass.logError)
		)
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('assets/css', { sourcemaps: '.' }))
		.pipe(browserSync.reload({ stream: true }))
}

// pug to html
function html() {
	return gulp
		.src('assets/pug/pages/starter-kit/*.pug')
		.pipe(
			pug({
				pretty: true,
			})
		)
		.on('error', console.error.bind(console))
		.pipe(gulp.dest('starter-kit'))
		.pipe(
			browserSync.reload({
				stream: true,
			})
		)
}

// Watch function
function watch() {
	browserSync.init({
		proxy: 'http://localhost/fms-prototype/src/',
	})
	gulp.watch('assets/scss/**/*.scss', style)
	gulp.watch('assets/pug/pages/theme/*.pug', html)
	gulp.watch('./src/*.html').on('change', browserSync.reload)
	gulp.watch('assets/css/*.css').on('change', browserSync.reload)
}

exports.style = style
exports.html = html
exports.watch = watch

const build = gulp.series(watch)
gulp.task('default', build, 'browser-sync')
