const gulp = require('gulp')
const path = require('path')
const gulpNSP = require('gulp-nsp')
const sass = require('gulp-sass')
const spawn = require('child_process').spawn
const rename = require('gulp-rename')

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

gulp.task('sync', function (done) {
  const vendorJSFiles = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/plotly.js/dist/plotly.min.js'
  ]
  gulp.src(vendorJSFiles, { allowEmpty: true })
    .pipe(gulp.dest('app/assets/javascripts/vendor/'))
  
  gulp.src('node_modules/govuk-frontend/govuk/all.js')
    .pipe(rename('gov-uk.js'))
    .pipe(gulp.dest('app/assets/javascripts/', { overwrite: true }))
  
  gulp.src('node_modules/govuk-frontend/govuk/assets/images/**/*')
    .pipe(gulp.dest('app/assets/images/', { overwrite: true }))

  gulp.src('node_modules/govuk-frontend/govuk/assets/fonts/**/*')
    .pipe(gulp.dest('app/assets/fonts/', { overwrite: true }))

  gulp.src('app/assets/javascripts/**/*.js')
    .pipe(gulp.dest('app/public/javascripts/', { overwrite: true }))

  gulp.src('app/assets/images/**/*')
    .pipe(gulp.dest('app/public/images/', { overwrite: true }))
  
  gulp.src('app/assets/fonts/**/*')
    .pipe(gulp.dest('app/public/fonts/', { overwrite: true }))
  done()
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

gulp.task('nsp', function (cb) {
  gulpNSP({ package: path.join(__dirname, '/package.json') }, cb)
})

gulp.task('generate-assets', gulp.series(gulp.parallel('assets', 'templates', 'sync', 'sass')))

gulp.task('generate-assets-and-start', gulp.series('generate-assets', function () {
  spawn('node', ['app/bin/www'], { stdio: 'inherit' })
}))

gulp.task('default', gulp.series('generate-assets-and-start'))
