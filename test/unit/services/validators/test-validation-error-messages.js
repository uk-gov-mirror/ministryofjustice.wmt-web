const ValidationErrorMessages = require('../../../../app/services/validators/validation-error-messages')
const expect = require('chai').expect

const fieldName = 'Name'

describe('services/validators/validation-error-messages', function () {
  it('should return expected IsRequired validation error message', function () {
    const expected = `${fieldName} is required`
    var message = ValidationErrorMessages.getIsRequiredMessage(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected IsAlpha validation error message', function () {
    const expected = `${fieldName} must only contain letters`
    var message = ValidationErrorMessages.getIsAlphaMessage(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected IsNumeric validation error message', function () {
    const expected = `${fieldName} must only contain numbers`
    var message = ValidationErrorMessages.getIsNumericMessage(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected IsRange validation error message', function () {
    var min = 1
    var max = 99
    const expected = `${fieldName} must be between ${min} and ${max}`
    var message = ValidationErrorMessages.getIsRangeMessage(fieldName, { min: min, max: max })
    expect(message).to.equal(expected)
  })

  it('should return expected IsInteger validation error message', function () {
    var min = 1
    var max = 99
    const expected = `${fieldName} must be a whole number between ${min} and ${max}`
    var message = ValidationErrorMessages.getIsIntegerMessage(fieldName, { min: min, max: max })
    expect(message).to.equal(expected)
  })

  it('should return expected IsFloat validation error message', function () {
    var min = 0.9
    var max = 37.5
    const expected = `${fieldName} must be a number between ${min} and ${max}`
    var message = ValidationErrorMessages.getIsFloatMessage(fieldName, { min: min, max: max })
    expect(message).to.equal(expected)
  })

  it('should return expected InvalidDateFormatMessage validation error message', function () {
    const expected = `${fieldName} was invalid`
    var message = ValidationErrorMessages.getInvalidDateFormatMessage(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected FutureDateMessage validation error message', function () {
    const expected = `${fieldName} must be in the future`
    var message = ValidationErrorMessages.getFutureDateMessage(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected IsDateLaterThanMessage validation error message', function () {
    var secondaryDisplayName = 'secondary'
    const expected = `${fieldName} must be after ${secondaryDisplayName}`
    var message = ValidationErrorMessages.getIsDateLaterThanMessage(fieldName, { secondaryDisplayName: secondaryDisplayName })
    expect(message).to.equal(expected)
  })

  it('should return expected IsDateLaterThanMessage validation error message', function () {
    const length = 100
    const expected = `${fieldName} must be shorter than ${length} characters`
    var message = ValidationErrorMessages.getIsLessThanLengthMessage(fieldName, { length: length })
    expect(message).to.equal(expected)
  })
})
