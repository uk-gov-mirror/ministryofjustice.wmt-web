const expect = require('chai').expect
const FieldValidator = require('../../../../app/services/validators/field-validator')
const ErrorHandler = require('../../../../app/services/validators/error-handler')

describe('services/validators/field-validator', function () {
  const FIELD_NAME = 'Name'
  const VALID_ALPHA = 'data'
  const EMPTY_DATA = ''

  describe('isRequired', function () {
    it('should return an error object if passed null', function () {
      var errorHandler = ErrorHandler()
      FieldValidator(null, FIELD_NAME, errorHandler).isRequired()
      var errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return an error object if passed undefined', function () {
      var errorHandler = ErrorHandler()
      FieldValidator(undefined, FIELD_NAME, errorHandler)
        .isRequired()
      var errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should throw error if data is an object', function () {
      var errorHandler = ErrorHandler()
      FieldValidator({}, FIELD_NAME, errorHandler)
        .isRequired()
      var errors = errorHandler.get()
      expect(errors).to.equal(false)
    })

    it('should return false if passed valid data', function () {
      var errorHandler = ErrorHandler()
      FieldValidator(VALID_ALPHA, FIELD_NAME, errorHandler)
        .isRequired()
      var errors = errorHandler.get()
      expect(errors).to.equal(false)
    })

    it('should return an error object if passed an empty string', function () {
      var errorHandler = ErrorHandler()
      FieldValidator(EMPTY_DATA, FIELD_NAME, errorHandler)
        .isRequired()
      var errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })
  })
})
