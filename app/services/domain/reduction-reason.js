const ValidationError = require('../errors/validation-error')
const FieldValidator = require('../validators/field-validator')
const ErrorHandler = require('../validators/error-handler')

class ReductionReason {
  constructor (reason, reasonShortName, category, allowancePercentage, maxAllowancePercentage, monthsToExpiry, isEnabled) {
    this.reason = reason
    this.reasonShortName = reasonShortName
    this.category = category
    this.allowancePercentage = allowancePercentage
    this.maxAllowancePercentage = maxAllowancePercentage
    this.monthsToExpiry = monthsToExpiry
    this.isEnabled = isEnabled
    this.isValid()
  }

  isValid () {
    const errors = ErrorHandler()

    FieldValidator(this.reason, 'reductionName', errors)
      .isRequired()
      .isLessThanLength(255)

    FieldValidator(this.reasonShortName, 'reductionShortName', errors)
      .isRequired()
      .isLessThanLength(255)

    FieldValidator(this.category, 'category', errors)
      .isRequired()

    if (this.isBlank(this.maxAllowancePercentage)) {
      this.maxAllowancePercentage = null
    }

    if (this.isBlank(this.allowancePercentage)) {
      this.allowancePercentage = null
    }

    if (this.isBlank(this.monthsToExpiry)) {
      this.monthsToExpiry = null
    }

    if (this.maxAllowancePercentage) {
      FieldValidator(this.maxAllowancePercentage, 'maxAllowancePercentage', errors)
        .isFloat(0.01, 100)
    }

    if (this.allowancePercentage) {
      FieldValidator(this.allowancePercentage, 'allowancePercentage', errors)
        .isFloat(0.01, 100)
        .isLessThanOrEqualTo(this.maxAllowancePercentage)
    }

    if (this.monthsToExpiry) {
      FieldValidator(this.monthsToExpiry, 'monthsToExpiry', errors)
        .isInt(1, 2147483647)
    }

    FieldValidator(this.isEnabled, 'isEnabled', errors)
      .isRequired()

    this.monthsToExpiry = parseInt(this.monthsToExpiry)
    this.allowancePercentage = parseFloat(this.allowancePercentage)
    this.maxAllowancePercentage = parseFloat(this.maxAllowancePercentage)
    this.category = parseFloat(this.category)
    this.isEnabled = this.isEnabled === 'true'

    const validationErrors = errors.get()

    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }

  isBlank (field) {
    return field === ''
  }
}

module.exports = ReductionReason
