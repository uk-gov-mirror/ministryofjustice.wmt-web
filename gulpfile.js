var gulp = require('gulp')
var path = require('path')
var gulpNSP = require('gulp-nsp')
var sass = require('gulp-sass')
var spawn = require('child_process').spawn
var node

gulp.task('assets', function (done) {
  gulp.src('node_modules/govuk_frontend_toolkit/javascripts/**/*')
    .pipe(gulp.dest('app/govuk_modules/govuk_frontend_toolkit/javascripts', { overwrite: true }))

  gulp.src('node_modules/govuk_frontend_toolkit/images/**/*')
    .pipe(gulp.dest('app/govuk_modules/govuk_frontend_toolkit/images', { overwrite: true }))

  gulp.src('node_modules/govuk_template_jinja/assets/**/*')
    .pipe(gulp.dest('app/govuk_modules/govuk_template/', { overwrite: true }))
  done()
})

gulp.task('templates', function (done) {
  gulp.src('node_modules/govuk_template_jinja/views/layouts/govuk_template.html')
    .pipe(gulp.dest('app/views/', { overwrite: true }))
  done()
})

gulp.task('vendorJS', function (done) {
  const vendorJSFiles = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/plotly.js/dist/plotly.min.js'
  ]

  gulp.src(vendorJSFiles, { allowEmpty: true })
    .pipe(gulp.dest('app/assets/javascripts/vendor/'))
  done()
})

gulp.task('sync', gulp.series('vendorJS', function () {
  return gulp.src('app/assets/javascripts/**/*.js')
    .pipe(gulp.dest('app/public/javascripts/', { overwrite: true }))
}))

gulp.task('syncAssets', function () {
  return gulp.src('app/assets/images/**/*')
    .pipe(gulp.dest('app/public/images/', { overwrite: true }))
})

gulp.task('sass', function (done) {
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
  done()
})

gulp.task('generate-assets', gulp.series('assets', 'templates', 'sync', 'sass', 'syncAssets'))

gulp.task('nsp', function (cb) {
  gulpNSP({ package: path.join(__dirname, '/package.json') }, cb)
})

gulp.task('watch', function () {
  gulp.watch(['app/app.js', 'app/services/**/*', 'app/assets/**/*', 'app/routes/**/*'], gulp.series('generate-assets-and-start'))
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

gulp.task('generate-assets-and-start', gulp.series('generate-assets', 'server'))

gulp.task('default', gulp.series('generate-assets-and-start', 'watch'))
