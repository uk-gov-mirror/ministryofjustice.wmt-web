const authentication = require('./authentication')
const config = require('../config')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const expressSanitized = require('express-sanitized')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const csurf = require('csurf')
const nunjucks = require('express-nunjucks')
const dateFilter = require('nunjucks-date-filter')
const path = require('path')
const routes = require('./routes')
const routesNoCsrf = require('./routes-no-csrf')
const cookieSession = require('cookie-session')
const getOrganisationalHierarchyTree = require('./services/organisational-hierarchy-tree')
const bunyan = require('bunyan')
const PrettyStream = require('bunyan-prettystream')

// Add logging
var prettyStream = new PrettyStream()
prettyStream.pipe(process.stdout)

var log = bunyan.createLogger({
  name: 'wmt-web',
  streams: [],
  serializers: {
    'error': errorSerializer
  }
})

log.addStream({
  level: 'DEBUG',
  stream: prettyStream
})

// Add file stream.
log.addStream({
  type: 'rotating-file',
  level: config.LOGGING_LEVEL,
  path: config.LOGGING_PATH,
  period: '1d',
  count: 7
})

function errorSerializer (error) {
  return {
    message: error.message,
    name: error.name,
    stack: error.stack
  }
}

var app = express()

// Set security headers.
app.use(helmet())

authentication(app)

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

// Cookie session
app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  name: 'session',
  keys: [config.APPLICATION_SECRET],
  maxAge: parseInt(config.SESSION_COOKIE_MAXAGE)
}))
// Update a value in the cookie so that the set-cookie will be sent
app.use(function (req, res, next) {
  req.session.nowInMinutes = Date.now() / 60e3
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSanitized())

// Send assetPath to all views.
app.use(function (req, res, next) {
  res.locals.asset_path = '/public/'
  next()
})

// Log each HTML request and it's response.
app.use(function (req, res, next) {
  // Log response started.
  log.info(req.method, req.path, 'called.')
  next()
})

// Use cookie parser middleware (required for csurf)
app.use(cookieParser(config.APPLICATION_SECRET, { httpOnly: true, secure: config.SECURE_COOKIE === 'true' }))

// Add routes that are allowed to be accessed from outside the application
// i.e. authentication-saml
var routerNoCsrf = new express.Router()
routesNoCsrf(routerNoCsrf)
app.use('/', routerNoCsrf)

// Check for valid CSRF tokens on state-changing methods.
app.use(csurf({ cookie: { httpOnly: true, secure: config.SECURE_COOKIE === 'true' } }))

// Generate CSRF tokens to be sent in POST requests
app.use(function (req, res, next) {
  if (req.hasOwnProperty('csrfToken')) {
    res.locals.csrfToken = req.csrfToken()
  }
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

// catch CSRF token errors
app.use(function (err, req, res, next) {
  const CSURF_ERROR_CODE = 'EBADCSRFTOKEN'
  if (err.code !== CSURF_ERROR_CODE) return next(err)
  res.status(403)
  res.render('includes/error', {
    error: 'Invalid CSRF token'
  })
})

// Development error handler.
app.use(function (err, req, res, next) {
  log.error({error: err})
  res.status(err.status || 500)
  if (err.status === 404) {
    res.render('includes/error-404')
  } else {
    res.render('includes/error', {
      error: developmentMode ? err : null
    })
  }
})

// Build the organisational hierarchy tree from DB
getOrganisationalHierarchyTree.build()

module.exports = app
