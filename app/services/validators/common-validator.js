const CASELOAD_CAPACITY = require('../../constants/caseload-capacity')

/**
 * This file defines all generic validation tests used in the application. This file can and should be used by the
 * three higher level validators: FieldValidator, FieldSetValidator, and UrlPathValidator.
 */
const moment = require('moment')

const dateFormatter = require('../date-formatter')

exports.isNullOrUndefined = function (value) {
  return typeof value === "undefined" || value === null
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
