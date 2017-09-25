const ValidationError = require('../errors/validation-error')
const FieldSetValidator = require('../validators/fieldset-validator')
const ErrorHandler = require('../validators/error-handler')
const dateFormatter = require('../date-formatter')
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

    this.capacityFromDate = dateFormatter.build(fromDay, fromMonth, fromYear)
    this.capacityToDate = dateFormatter.build(toDay, toMonth, toYear)
    this.isValid()
  }

  isValid () {
    var errors = ErrorHandler()

    FieldSetValidator(this.fromFields, 'capacityFromDate', errors)
      .isRequired()
      .isPastDate(this.capacityFromDate)
      .isLaterThan(moment().subtract(CASELOAD_CAPACITY.MAX_HISTORY, 'years'), this.capacityFromDate)

    FieldSetValidator(this.toFields, 'capacityToDate', errors)
      .isRequired()
      .isPastDate(this.capacityToDate)
      .isLaterThan(this.capacityFromDate, this.capacityToDate)

    var validationErrors = errors.get()

    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = CapacityDateRange
