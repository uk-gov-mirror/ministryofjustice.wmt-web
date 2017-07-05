const bodyParser = require('body-parser')
const express = require('express')
const favicon = require('serve-favicon')
const helmet = require('helmet')
const nunjucks = require('express-nunjucks')
const dateFilter = require('nunjucks-date-filter')
const path = require('path')
const routes = require('./routes')
const cookieParser = require('cookie-parser')

var app = express()

// Set security headers.
app.use(helmet())

var developmentMode = app.get('env') === 'development'

app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

var nunjucksObj = nunjucks(app, {
  watch: developmentMode,
  noCache: developmentMode
})

nunjucksObj.env.addFilter('date', dateFilter)
nunjucksObj.env.addFilter('isObject', function (obj) {
  return typeof obj === 'object'
})

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(path.join(__dirname, 'govuk_modules', 'govuk_template')))
app.use('/public', express.static(path.join(__dirname, 'govuk_modules', 'govuk_frontend_toolkit')))
app.use(favicon(path.join(__dirname, 'govuk_modules', 'govuk_template', 'images', 'favicon.ico')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// Send assetPath to all views.
app.use(function (req, res, next) {
  res.locals.asset_path = '/public/'
  next()
})

// Log last path to cookie
app.use(function (req, res, next) {
  if (req.path !== '/login') {
    res.cookie('lastPath', req.path)
  }
  next()
})

// Log each HTML request and it's response.
app.use(function (req, res, next) {
  // Log response started.
  console.log(req.method, req.path, 'called.')
  next()
})

// Build the router to route all HTTP requests and pass to the routes file for route configuration.
var router = express.Router()
routes(router)
app.use('/', router)

// catch 404 and forward to error handler.
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  res.status(404)
  next(err)
})

// Development error handler.
app.use(function (err, req, res, next) {
  console.log({error: err})
  res.status(err.status || 500)
  if (err.status === 404) {
    res.render('includes/error-404')
  } else {
    res.render('includes/error', {
      error: developmentMode ? err : null
    })
  }
})

module.exports = app
