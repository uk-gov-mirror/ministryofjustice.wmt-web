const CASELOAD_CAPACITY = require('../../constants/caseload-capacity')

const moment = require('moment')

const dateFormatter = require('../date-formatter')

exports.isNullOrUndefined = function (data) {
  return typeof data === 'undefined' || data === null
}

exports.isRequired = function (data) {
  var isRequired = false
  var self = this

  if (data instanceof Array) {
    data.forEach(function (value) {
      if (self.isNullOrUndefined(value)) {
        isRequired = true
      }
    })
  } else if (self.isNullOrUndefined(data)) {
    isRequired = true
  }

  return isRequired
}

exports.isValidDate = function (date) {
  return date instanceof moment && date.isValid()
}

exports.isDateInThePast = function (date) {
  return this.isValidDate(date) && date < dateFormatter.now()
}

exports.isDateOlderThanMaxHistory = function (date) {
  var yearsAgo = dateFormatter.now().diff(date, 'years')
  return yearsAgo > CASELOAD_CAPACITY.MAX_HISTORY
}
