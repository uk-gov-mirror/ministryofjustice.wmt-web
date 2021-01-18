const ValidationError = require('../errors/validation-error')
const FieldSetValidator = require('../validators/fieldset-validator')
const ErrorHandler = require('../validators/error-handler')
const CASELOAD_CAPACITY = require('../../constants/caseload-capacity')
const moment = require('moment')

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

    this.isValid()
  }

  isValid () {
    const errors = ErrorHandler()

    this.capacityFromDate = FieldSetValidator(this.fromFields, 'capacityFromDate', errors)
      .isRequired()
      .isValidDate()
      .isPastDate()
      .isLaterThan(moment().subtract(CASELOAD_CAPACITY.MAX_HISTORY, 'years'), 'maxCapacityHistory')
      .getFormattedDate()

    this.capacityToDate = FieldSetValidator(this.toFields, 'capacityToDate', errors)
      .isRequired()
      .isValidDate(this.capacityToDate)
      .isPastOrPresentDate(this.capacityToDate)
      .isLaterThan(this.capacityFromDate, 'capacityFromDate')
      .getFormattedDate()

    const validationErrors = errors.get()

    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = CapacityDateRange
