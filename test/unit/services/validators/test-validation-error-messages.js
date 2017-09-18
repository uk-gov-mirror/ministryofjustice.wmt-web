const ValidationErrorMessages = require('../../../../app/services/validators/validation-error-messages.js')
const expect = require('chai').expect

const fieldName = 'Name'

describe('services/validators/validation-error-messages', function () {
  it('should return expected IsRequired validation error message', function () {
    const expected = `${fieldName} is required`
    var message = ValidationErrorMessages.getIsRequired(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected IsAlpha validation error message', function () {
    const expected = `${fieldName} must only contain letters`
    var message = ValidationErrorMessages.getIsAlpha(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected IsNumeric validation error message', function () {
    const expected = `${fieldName} must only contain numbers`
    var message = ValidationErrorMessages.getIsNumeric(fieldName)
    expect(message).to.equal(expected)
  })

  it('should return expected IsRange validation error message', function () {
    var min = 1
    var max = 99
    const expected = `${fieldName} must be between ${min} and ${max}`
    var message = ValidationErrorMessages.getIsRangeMessage(fieldName, { min: min, max: max })
    expect(message).to.equal(expected)
  })
})
