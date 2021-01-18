const ValidationErrorMessages = require('../../../../app/services/validators/validation-error-messages')
const expect = require('chai').expect

const fieldName = 'Name'

describe('services/validators/validation-error-messages', function () {
  it('should return expected IsRequired validation error message', function () {
    const expected = `${fieldName} is required`
    const message = ValidationErrorMessages.getIsRequiredMessage(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected IsAlpha validation error message', function () {
    const expected = `${fieldName} must only contain letters`
    const message = ValidationErrorMessages.getIsAlphaMessage(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected IsNumeric validation error message', function () {
    const expected = `${fieldName} must only contain numbers`
    const message = ValidationErrorMessages.getIsNumericMessage(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected IsRange validation error message', function () {
    const min = 1
    const max = 99
    const expected = `${fieldName} must be between ${min} and ${max}`
    const message = ValidationErrorMessages.getIsRangeMessage(fieldName, { min: min, max: max })
    expect(message).to.equal(expected)
  })

  it('should return expected IsInteger validation error message', function () {
    const min = 1
    const max = 99
    const expected = `${fieldName} must be a whole number between ${min} and ${max}`
    const message = ValidationErrorMessages.getIsIntegerMessage(fieldName, { min: min, max: max })
    expect(message).to.equal(expected)
  })

  it('should return expected IsFloat validation error message', function () {
    const min = 0.9
    const max = 37.5
    const expected = `${fieldName} must be a number between ${min} and ${max}`
    const message = ValidationErrorMessages.getIsFloatMessage(fieldName, { min: min, max: max })
    expect(message).to.equal(expected)
  })

  it('should return expected InvalidDateFormatMessage validation error message', function () {
    const expected = `${fieldName} was invalid`
    const message = ValidationErrorMessages.getInvalidDateFormatMessage(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected FutureDateMessage validation error message', function () {
    const expected = `${fieldName} must be in the future`
    const message = ValidationErrorMessages.getFutureDateMessage(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected IsDateLaterThanMessage validation error message', function () {
    const secondaryDisplayName = 'secondary'
    const expected = `${fieldName} must be after ${secondaryDisplayName}`
    const message = ValidationErrorMessages.getIsDateLaterThanMessage(fieldName, { secondaryDisplayName: secondaryDisplayName })
    expect(message).to.equal(expected)
  })

  it('should return expected IsDateLaterThanMessage validation error message', function () {
    const length = 100
    const expected = `${fieldName} must be shorter than ${length} characters`
    const message = ValidationErrorMessages.getIsLessThanLengthMessage(fieldName, { length: length })
    expect(message).to.equal(expected)
  })
})
