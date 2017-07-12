const fs = require('fs')
const path = require('path')
const files = fs.readdirSync(path.resolve(__dirname, 'routes_no_csrf'))

const routes = files.map((file) => {
  return require(path.resolve(__dirname, 'routes_no_csrf', file.replace('.js', '')))
})

module.exports = function (router) {
  routes.forEach(function (route) {
    route(router)
  })
}
