const ValidationError = require('../errors/validation-error')
const FieldsetValidator = require('../validators/fieldset-validator')
const ErrorHandler = require('../validators/error-handler')
const dateFormatter = require('../date-formatter')
const ERROR_MESSAGES = require('../validators/validation-error-messages')

class UtilisationDate {
  constructor (day, month, year) {
    this.fields = [
      day,
      month,
      year
    ]

    this.utilisationDate = dateFormatter.build(day, month, year)
    this.IsValid()
  }

  IsValid () {
    var errors = ErrorHandler()

    FieldsetValidator(this.fields, 'utilisationDate', errors)
      .isRequired(ERROR_MESSAGES.getEnterYourDateOfBirth)
      .isOlderThanMaxHistory(this.utilisationDate)
      .isValidDate(this.utilisationDate)
    var validationErrors = errors.get()

    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = UtilisationDate
