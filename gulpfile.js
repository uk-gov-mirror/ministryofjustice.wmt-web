var gulp = require('gulp')
var path = require('path')
var mocha = require('gulp-mocha')
var gulpNSP = require('gulp-nsp')
var sass = require('gulp-sass')
var standard = require('gulp-standard')
var spawn = require('child_process').spawn
var node

gulp.task('assets', function () {
  gulp.src('node_modules/govuk_frontend_toolkit/javascripts/**/*')
    .pipe(gulp.dest('app/govuk_modules/govuk_frontend_toolkit/javascripts', { overwrite: true }))

  gulp.src('node_modules/govuk_frontend_toolkit/images/**/*')
    .pipe(gulp.dest('app/govuk_modules/govuk_frontend_toolkit/images', { overwrite: true }))

  gulp.src('node_modules/govuk_template_jinja/assets/**/*')
    .pipe(gulp.dest('app/govuk_modules/govuk_template/', { overwrite: true }))
})

gulp.task('standard', function () {
  return gulp.src([
    '!node_modules/*',
    '!app/govuk_modules/**/*.js',
    '!app/assets/javascripts/**/*.js',
    '!app/public/javascripts/**/*.js',
    'app/**/*.js',
    'test/**/*.js'
  ])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('mocha', function () {
  return gulp.src(['test/**/*.js'], { read: false })
      .pipe(mocha({ reporter: 'spec' }))
})

gulp.task('test', ['standard', 'mocha'])

gulp.task('templates', function () {
  gulp.src('node_modules/govuk_template_jinja/views/layouts/govuk_template.html')
    .pipe(gulp.dest('app/views/', { overwrite: true }))
})

gulp.task('sync', function () {
  gulp.src('app/assets/javascripts/**/*')
    .pipe(gulp.dest('app/public/javascripts/', { overwrite: true }))
  gulp.src('app/assets/images/**/*')
    .pipe(gulp.dest('app/public/images/', { overwrite: true }))
})

gulp.task('sass', function () {
  gulp.src('app/assets/sass/**/*.scss')
    .pipe(sass({
      style: 'expanded',
      sourcemap: true,
      includePaths: [
        'node_modules/govuk-elements-sass/public/sass',
        'node_modules/govuk_frontend_toolkit/stylesheets',
        'govuk_modules/govuk_template/assets/stylesheets',
        'govuk_modules/govuk_frontend_toolkit/stylesheets',
        'govuk_modules/govuk-elements-sass/'
      ],
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('app/public/stylesheets'))
})

gulp.task('generate-assets', ['assets', 'templates', 'sync', 'sass'])

gulp.task('generate-assets-and-start', ['generate-assets', 'server'], function () {

})

gulp.task('nsp', function (cb) {
  gulpNSP({package: path.join(__dirname, '/package.json')}, cb)
})

gulp.task('watch', function () {
  gulp.watch(['app/app.js', 'app/services/**/*', 'app/assets/**/*'], ['generate-assets-and-start'])
})

gulp.task('server', function () {
  if (node) node.kill()
  node = spawn('node', ['app/bin/www'], { stdio: 'inherit' })
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...')
    }
  })
})

gulp.task('default', ['generate-assets-and-start', 'watch'])
