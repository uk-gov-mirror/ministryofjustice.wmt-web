const validator = require('validator')
const _ = require('lodash')
const ERROR_MESSAGES = require('./validation-error-messages')
const config = require('../../../config')

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
    var message = (!specificMessage) ? ERROR_MESSAGES.getIsRequiredMessage : specificMessage
    if (!this.data || _.isEmpty(this.data)) {
      this.errors.add(this.fieldName, message)
    }

    return this
  }

  isLessThanLength (length, specificMessage) {
    var message = (!specificMessage) ? ERROR_MESSAGES.getIsLessThanLengthMessage : specificMessage
    if (this.data && !validator.isLength(this.data, { max: length })) {
      this.errors.add(this.fieldName, message, { length: length })
    }
    return this
  }

  isInt (min, max) {
    let options = { allow_leading_zeroes: false, min: min, max: max }
    if (this.data && !validator.isInt(this.data.toString(), options)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getIsIntegerMessage, options)
    }
    return this
  }

  isFloat (min, max) {
    let options = { min: min, max: max }
    if (this.data && !validator.isFloat(this.data, options)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getIsFloatMessage, options)
    }
    return this
  }

  isValidUsername (username) {
    if (!username || !validator.isEmail(username) ||
      !username.endsWith('@' + config.ACTIVE_DIRECTORY_DOMAIN)) {
      this.errors.add(this.fieldName, ERROR_MESSAGES.getIsValidUsernameMessage)
    }
    return this
  }
}

module.exports = function (data, fieldName, errors) {
  return new FieldValidator(data, fieldName, errors)
}
