const ValidationError = require('../errors/validation-error')
const FieldSetValidator = require('../validators/fieldset-validator')
const ErrorHandler = require('../validators/error-handler')
const moment = require('moment')

class ArchiveDateRange {
  constructor (fromDay, fromMonth, fromYear, toDay, toMonth, toYear) {
    this.fromFields = [
      fromDay,
      fromMonth,
      fromYear
    ]

    this.toFields = [
      toDay,
      toMonth,
      toYear
    ]

    this.isValid()
  }

  isValid () {
    var errors = ErrorHandler()

    this.archiveFromDate = FieldSetValidator(this.fromFields, 'archiveFromDate', errors)
      .isRequired()
      .isValidDate()
      .isPastDate()
      .getFormattedDate()

    this.archiveToDate = FieldSetValidator(this.toFields, 'archiveToDate', errors)
      .isRequired()
      .isValidDate(this.archiveToDate)
      .isPastOrPresentDate(this.archiveToDate)
      .isLaterThan(this.archiveFromDate, 'archiveFromDate')
      .getFormattedDate()

    var validationErrors = errors.get()

    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = ArchiveDateRange
