var Unauthorized = function (message, redirect) {
  this.message = message
  this.statusCode = 401
  this.redirect = redirect
}

var Forbidden = function (message, redirect) {
  this.message = message
  this.statusCode = 403
  this.redirect = redirect
}

module.exports.Unauthorized = Unauthorized
module.exports.Forbidden = Forbidden
