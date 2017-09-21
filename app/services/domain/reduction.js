const ValidationError = require('../errors/validation-error')
const FieldValidator = require('../validators/field-validator')
const FieldSetValidator = require('../validators/fieldset-validator')
const ErrorHandler = require('../validators/error-handler')
const ERROR_MESSAGES = require('../validators/validation-error-messages')
const reductionStatusType = require('../../constants/reduction-status-type')
const dateFormatter = require('../date-formatter')

class Reduction {
  constructor (reasonForReductionId, hours, reductionStartDate, reductionEndDate, notes) {
    this.reasonForReductionId = reasonForReductionId
    this.hours = hours
    this.reductionStartDateFields = reductionStartDate
    this.reductionEndDateFields = reductionEndDate
    this.notes = notes
    this.isValid()
    this.status = this.setReductionStatus()
  }

  isValid () {
    var errors = ErrorHandler()

    FieldValidator(this.reasonForReductionId, 'reasonForReductionId', errors)
      .isRequired()

    FieldValidator(this.hours, 'reductionHours', errors)
      .isRequired()
      .isFloat(0, 37)

    var startDate = dateFormatter.build(this.reductionStartDateFields[0], this.reductionStartDateFields[1], this.reductionStartDateFields[2])

    FieldSetValidator(this.reductionStartDateFields, 'reductionStartDate', errors)
      .isRequired(ERROR_MESSAGES.getIsRequiredMessage)
      .isValidDate(startDate)

    var endDate = dateFormatter.build(this.reductionEndDateFields[0], this.reductionEndDateFields[1], this.reductionEndDateFields[2])

    FieldSetValidator(this.reductionEndDateFields, 'reductionEndDate', errors)
      .isRequired(ERROR_MESSAGES.getIsRequiredMessage)
      .isValidDate(endDate)
      .isLaterThan(startDate, endDate)

    if (this.notes) {
      FieldValidator(this.notes, 'notes', errors)
        .isLessThanLength(4000)
    }

    var validationErrors = errors.get()
    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }

    this.reasonForReductionId = parseInt(this.reasonForReductionId)
    this.hours = parseFloat(this.hours)
    this.reductionStartDate = startDate.toDate()
    this.reductionEndDate = endDate.toDate()
  }

  setReductionStatus () {
    var currentDate = new Date()
    var status = reductionStatusType.ACTIVE
    if ((this.reductionStartDate > currentDate) && (this.reductionEndDate > currentDate)) {
      status = reductionStatusType.SCHEDULED
    } else if ((this.reductionStartDate < currentDate) && (this.reductionEndDate < currentDate)) {
      status = reductionStatusType.ARCHIVED
    }

    return status
  }
}

module.exports = Reduction
