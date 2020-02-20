const ValidationError = require('../errors/validation-error')
const FieldValidator = require('../validators/field-validator')
const ErrorHandler = require('../validators/error-handler')

class User {
  constructor (name) {
    this.name = name
    this.isValid()
  }

  isValid () {
    var errors = ErrorHandler()

    FieldValidator(this.name, 'fullname', errors)
      .isRequired()
      .isLessThanLength(255)

    var validationErrors = errors.get()

    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = User
