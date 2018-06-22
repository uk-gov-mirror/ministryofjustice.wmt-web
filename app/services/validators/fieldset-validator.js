const moment = require('moment')
const ERROR_MESSAGES = require('./validation-error-messages')
const dateFormatter = require('../date-formatter')
const DATE_LIMIT = moment('20990101', 'YYYYMMDD')
const DATE_LOWER_LIMIT = moment('19000101', 'YYYYMMDD')

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

    if (this.data.length === 3) {
      this.formattedDate = dateFormatter.build(this.data[0], this.data[1], this.data[2])
    }
  }

  isRequired (specificMessage) {
    var message = (!specificMessage) ? ERROR_MESSAGES.getIsRequiredMessage : specificMessage
    var self = this
    if (this.data instanceof Array && this.data.length === 3) {
      this.data.forEach(function (data) {
        if (!data) {
          self.errors.add(self.fieldName, message)
        }
      })
    } else {
      self.errors.add(self.fieldName, message)
    }
    return this
  }

  isValidDate () {
    if (!validateDate(this.formattedDate)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getInvalidDateFormatMessage)
    }
    return this
  }

  isFutureDate () {
    if (!isDateInTheFuture(this.formattedDate)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getFutureDateMessage)
    }
    return this
  }

  isPastDate () {
    if (!isDateInThePast(this.formattedDate)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getPastDateMessage)
    }
    return this
  }

  isPastOrPresentDate () {
    if (isDateInTheFuture(this.formattedDate)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getPastOrPresentDateMessage)
    }
    return this
  }

  isLaterThan (dateToCompare, dateToCompareFieldName) {
    if (!isDateAfter(this.formattedDate, dateToCompare)) {
      var options = { secondaryFieldName: dateToCompareFieldName }
      this.errors.add(this.fieldName, ERROR_MESSAGES.getIsDateLaterThanMessage, options)
    }
    return this
  }

  getFormattedDate () {
    return this.formattedDate
  }
}

function validateDate (date) {
  if (!date) return false
  return date instanceof moment && date.isValid() &&
    date < DATE_LIMIT && date > DATE_LOWER_LIMIT
}

function isDateInTheFuture (date) {
  return validateDate(date) && date > dateFormatter.now()
}

function isDateInThePast (date) {
  return validateDate(date) && date < dateFormatter.now()
}

function isDateAfter (endDate, startDate) {
  return endDate > startDate
}

module.exports = function (data, fieldName, errors) {
  return new FieldsetValidator(data, fieldName, errors)
}
