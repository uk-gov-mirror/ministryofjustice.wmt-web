const moment = require('moment')
const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_ENCODE_FORMAT = 'YYYYMMDD'
const INVALID_DATE_ERROR = 'Invalid date'
const bases = require('bases')

exports.now = function () {
  var now = moment()
  return applyDST(now)
}

exports.build = function (day, month, year) {
  month = month - 1
  var date = moment([year, month, day])
  return applyDST(date)
}

function applyDST (date) {
  if (date.isDST()) {
    date = date.add(1, 'hour')
  }
  return date
}