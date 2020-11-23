const ValidationError = require('../../../../app/services/errors/validation-error.js')
const expect = require('chai').expect

describe('services/errors/validation-error', function () {
  it('should construct a validation error with a single error provided', function (done) {
    const validationError = new ValidationError({ field: ['error message'] })
    expect(validationError.validationErrors.field[0]).to.equal('error message')
    done()
  })

  it('should construct a validation error with multiple errors provided', function (done) {
    const validationError = new ValidationError({ field: ['error message 01', 'error message 02'] })
    expect(validationError.validationErrors.field[0]).to.equal('error message 01')
    expect(validationError.validationErrors.field[1]).to.equal('error message 02')
    done()
  })
})
