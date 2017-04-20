const validator = require('./common-validator')
const ERROR_MESSAGES = require('./validation-error-messages')
const CASELOAD_CAPACITY = require('../../constants/caseload-capacity')


class FieldsetValidator {

  /**
   * Build a validator for validating fieldsets (I.e. a group of fields).
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
    var message = (!specificMessage) ? ERROR_MESSAGES.getIsRequired : specificMessage
    var self = this
    if (this.data instanceof Array) {
      this.data.forEach(function (data) {
        if (validator.isNullOrUndefined(data)) {
          self.errors.add(self.fieldName, message)
        }
      })
    }
    return this
  }

  isValidDate (date) {
    if (!validator.isValidDate(date)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getInvalidDateFormatMessage)
    }
    return this
  }

  isPastDate (date) {
    if (!validator.isDateInThePast(date)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getPastDateMessage)
    }
    return this
  }

  isOlderThanMaxHistory (date) {
    if (validator.isDateOlderThanMaxHistory(date)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getIsOlderThanMaxHistory, { years: CASELOAD_CAPACITY.MAX_HISTORY })
    }
    return this
  }
}

module.exports = function (data, fieldName, errors) {
  return new FieldsetValidator(data, fieldName, errors)
}
