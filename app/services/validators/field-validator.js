const validator = require('validator')
const ERROR_MESSAGES = require('./validation-error-messages')

class FieldValidator {
  /**
   * Build a validator for validating fields.
   * @param data A single element to validate.
   * @param fieldName The name of of the HTML element to link the error message to.
   * @param errors An instance of the ErrorHandler class.
   */
  constructor (data, fieldName, errors) {
    this.data = data
    this.fieldName = fieldName
    this.errors = errors
  }

  isRequired (specificMessage) {
    var message = (!specificMessage) ? ERROR_MESSAGES.getIsRequired : specificMessage
    if (!this.data) {
      this.errors.add(this.fieldName, message)
    }

    return this
  }

  isInt (min, max) {
    let options = { allow_leading_zeroes: false, min: min, max: max }
    if (!validator.isInt(this.data, options)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getIsIntegerMessage, options)
    }
    return this
  }

  isFloat (min, max) {
    let options = { min: min, max: max }
    if (!validator.isFloat(this.data, options)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getIsFloatMessage, options)
    }
    return this
  }
}

module.exports = function (data, fieldName, errors) {
  return new FieldValidator(data, fieldName, errors)
}
