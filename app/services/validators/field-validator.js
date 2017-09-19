const validator = require('validator')
const ERROR_MESSAGES = require('./validation-error-messages')
const FIELD_NAMES = require('./validation-field-names')

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
    this.displayName = FIELD_NAMES[this.fieldName]
    this.errors = errors
  }

  isRequired (specificMessage) {
    var message = (!specificMessage) ? getMsg => ERROR_MESSAGES.getIsRequired(this.displayName) : specificMessage
    if (!this.data) {
      this.errors.add(this.fieldName, message)
    }

    return this
  }

  isInt (min, max) {
    let options = { allow_leading_zeroes: false, min: min, max: max }
    if (!validator.isInt(this.data, options)) {
      this.errors.add(this.fieldName, getMsg => ERROR_MESSAGES.getIsIntegerMessage(this.displayName, options), options)
    }
    return this
  }

  isFloat (min, max) {
    let options = { min: min, max: max }
    if (!validator.isFloat(this.data, options)) {
      this.errors.add(this.fieldName, getMsg => ERROR_MESSAGES.getIsFloatMessage(this.displayName, options), options)
    }
    return this
  }
}

module.exports = function (data, fieldName, errors) {
  return new FieldValidator(data, fieldName, errors)
}
