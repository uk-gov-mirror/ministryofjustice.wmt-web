const ValidationError = require('../errors/validation-error')
const FieldValidator = require('../validators/field-validator')
const FieldSetValidator = require('../validators/fieldset-validator')
const ErrorHandler = require('../validators/error-handler')
const reductionStatusType = require('../../constants/reduction-status-type')

class Reduction {
  constructor (reasonForReductionId, hours, reductionStartDate, reductionEndDate, notes, reductionReason, reductionSubmitter) {
    this.reasonForReductionId = reasonForReductionId
    this.hours = hours
    this.reductionStartDateFields = reductionStartDate
    this.reductionEndDateFields = reductionEndDate
    this.notes = notes
    this.isValid(reductionReason)
    this.status = this.setReductionStatus()
    this.reductionSubmitter = reductionSubmitter
  }

  isValid (reductionReason) {
    var errors = ErrorHandler()

    FieldValidator(this.reasonForReductionId, 'reasonForReductionId', errors)
      .isRequired()

    FieldValidator(this.hours, 'reductionHours', errors)
      .isRequired()
      .isFloat(0, 37)

    if (reductionReason.maxAllowanceHours !== 0) {
      FieldValidator(this.hours, 'reductionHours', errors)
        .isFloat(0, reductionReason.maxAllowanceHours)
    }

    var startDate = FieldSetValidator(this.reductionStartDateFields, 'reductionStartDate', errors)
      .isRequired()
      .isValidDate()
      .getFormattedDate()

    var endDate = FieldSetValidator(this.reductionEndDateFields, 'reductionEndDate', errors)
      .isRequired()
      .isValidDate()
      .isLaterThan(startDate, 'reductionStartDate')
      .getFormattedDate()

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
    if (this.reductionStartDate > currentDate) {
      status = reductionStatusType.SCHEDULED
    } else if (this.reductionEndDate < currentDate) {
      status = reductionStatusType.ARCHIVED
    }

    return status
  }
}

module.exports = Reduction
