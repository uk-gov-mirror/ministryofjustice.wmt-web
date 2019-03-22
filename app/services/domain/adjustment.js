const ValidationError = require('../errors/validation-error')
const ErrorHandler = require('../validators/error-handler')
const FieldValidator = require('../validators/field-validator')

class Adjustment {
  constructor (request) {
    var newAdjustments = {}
    Object.keys(request).forEach(function (key) {
      newAdjustments[key] = request[key]
    })
    this.isValid(newAdjustments)
  }

  isValid (newAdjustments) {
    var errors = ErrorHandler()
    this.isAdjustmentPointsValid(newAdjustments, errors)
    var validationErrors = errors.get()
    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }

  isAdjustmentPointsValid (newAdjustments, errors) {
    Object.keys(newAdjustments).forEach(function (thisKey) {
      FieldValidator(newAdjustments[thisKey], thisKey, errors)
        .isRequired()
        .isInt(0, 999)
    })
  }
}

module.exports = Adjustment
