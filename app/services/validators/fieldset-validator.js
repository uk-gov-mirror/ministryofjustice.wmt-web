const moment = require('moment')
const ERROR_MESSAGES = require('./validation-error-messages')
const dateFormatter = require('../date-formatter')
const DATE_LIMIT = moment('20990101', 'YYYYMMDD')

class FieldsetValidator {
  /**
   * Build a validator for validating fieldsets (I.e. a group of date fields).
   * @param data An array of elements to validate as a set.
   * @param fieldName The name of of the HTML element to link the error message to.
   * @param errors An instance of the ErrorHandler class.
   */
  constructor (data, fieldName, errors) {
    this.data = data || []
    this.fieldName = fieldName
    this.errors = errors
  }

  isRequired (specificMessage) {
    var message = (!specificMessage) ? ERROR_MESSAGES.getIsRequiredMessage : specificMessage
    var self = this
    if (this.data instanceof Array) {
      this.data.forEach(function (data) {
        if (!data) {
          self.errors.add(self.fieldName, message)
        }
      })
    }
    return this
  }

  isValidDate (date) {
    if (!validateDate(date)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getInvalidDateFormatMessage)
    }
    return this
  }

  isFutureDate (date) {
    if (!isDateInTheFuture(date)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getFutureDateMessage)
    }
    return this
  }

  isLaterThan (startDate, endDate) {
    if (!isDateAfter(startDate, endDate)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getIsDateLaterThanMessage)
    }
    return this
  }
}

function validateDate (date) {
  if (!date) return false
  return date instanceof moment && date.isValid() &&
         date < DATE_LIMIT
}

function isDateInTheFuture (date) {
  return validateDate(date) && date > dateFormatter.now()
}

function isDateAfter (startDate, endDate) {
  return endDate > startDate
}

module.exports = function (data, fieldName, errors) {
  return new FieldsetValidator(data, fieldName, errors)
}
