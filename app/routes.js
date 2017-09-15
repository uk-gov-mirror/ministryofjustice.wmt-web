/** * This file defines all routes used in this application. Any logic that is
 * applicable to all routes can be added here.
 */

const fs = require('fs')
const path = require('path')
const files = fs.readdirSync(path.resolve(__dirname, 'routes'))

module.exports = function (router) {
  var orderedFiles = orderFilesForRoutes(files)

  var routes = orderedFiles.map((file) => {
    return require(path.resolve(__dirname, 'routes', file.replace('.js', '')))
  })

  routes.forEach(function (route) {
    route(router)
  })
}

/**
 * Ensure the default view route will be at the end of the routes array so that it will only
 * catch routes which have not been matched by any other
 */
var orderFilesForRoutes = function (files) {
  var orderedFiles = Object.assign([], files)
  var defaultRouteFileIndex = orderedFiles.indexOf('organisation-unit-default-view.js')
  var defaultRouteFile = orderedFiles.splice(defaultRouteFileIndex, 1)
  orderedFiles.push(defaultRouteFile[0])

  return orderedFiles
}
