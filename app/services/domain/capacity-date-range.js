const ValidationError = require('../errors/validation-error')
const FieldsetValidator = require('../validators/fieldset-validator')
const ErrorHandler = require('../validators/error-handler')
const dateFormatter = require('../date-formatter')
const ERROR_MESSAGES = require('../validators/validation-error-messages')

class CapacityDateRange {
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

    this.capacityFromDate = dateFormatter.build(fromDay, fromMonth, fromYear)
    this.capacityToDate = dateFormatter.build(toDay, toMonth, toYear)
    this.isValid()
  }

  isValid () {
    var errors = ErrorHandler()

    FieldsetValidator(this.fromFields, 'capacityFromDate', errors)
      .isRequired(ERROR_MESSAGES.isRequired)
      .isValidDate(this.capacityFromDate)
      .isPastDate(this.capacityFromDate)
      .isOlderThanMaxHistory(this.capacityFromDate)

    FieldsetValidator(this.toFields, 'capacityToDate', errors)
      .isRequired(ERROR_MESSAGES.isRequired)
      .isValidDate(this.capacityToDate)
      .isPastDate(this.capacityToDate)
      .isOlderThanMaxHistory(this.capacityToDate)

    var validationErrors = errors.get()

    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = CapacityDateRange
