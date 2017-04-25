const ValidationError = require('../errors/validation-error')
const validator = require('../validators/common-validator')
const ErrorHandler = require('../validators/error-handler')
const dateFormatter = require('../date-formatter')
const ERROR_MESSAGES = require('../validators/validation-error-messages')
const CASELOAD_CAPACITY = require('../../constants/caseload-capacity')

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

    if (validator.isRequired(this.fromFields)) {
      errors.add('capacityFromDate', ERROR_MESSAGES.getIsRequired)
    }

    if (!validator.isValidDate(this.capacityFromDate)) {
      errors.add('capacityFromDate', ERROR_MESSAGES.getInvalidDateFormatMessage)
    }

    if (!validator.isDateInThePast(this.capacityFromDate)) {
      errors.add('capacityFromDate', ERROR_MESSAGES.getPastDateMessage)
    }

    if (validator.isDateOlderThanMaxHistory(this.capacityFromDate)) {
      errors.add('capacityFromDate', ERROR_MESSAGES.getIsOlderThanMaxHistory, { years: CASELOAD_CAPACITY.MAX_HISTORY })
    }

    if (validator.isRequired(this.toFields)) {
      errors.add('capacityToDate', ERROR_MESSAGES.getIsRequired)
    }

    if (!validator.isValidDate(this.capacityToDate)) {
      errors.add('capacityToDate', ERROR_MESSAGES.getInvalidDateFormatMessage)
    }

    if (!validator.isDateInThePast(this.capacityToDate)) {
      errors.add('capacityToDate', ERROR_MESSAGES.getPastDateMessage)
    }

    if (validator.isDateOlderThanMaxHistory(this.capacityToDate)) {
      errors.add('capacityToDate', ERROR_MESSAGES.getIsOlderThanMaxHistory, { years: CASELOAD_CAPACITY.MAX_HISTORY })
    }

    var validationErrors = errors.get()

    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = CapacityDateRange
