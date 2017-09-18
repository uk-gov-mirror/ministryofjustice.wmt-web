const expect = require('chai').expect
const FieldValidator = require('../../../../app/services/validators/field-validator')
const ErrorHandler = require('../../../../app/services/validators/error-handler')

describe('services/validators/field-validator', function () {
  const FIELD_NAME = 'Name'
  const VALID_ALPHA = 'data'
  const EMPTY_DATA = ''

  var errorHandler

  beforeEach(function () {
    errorHandler = ErrorHandler()
  })

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

  describe('isInt', function () {
    it('lower boundary (zero): should return false if passed valid data', function () {
      var min = 0
      var max = 99
      FieldValidator('0', FIELD_NAME, errorHandler).isInt(min, max)
      var errors = errorHandler.get()
      expect(errors).to.equal(false)
    })

    it('lower boundary (non-zero): should return false if passed valid data', function () {
      var min = 1
      var max = 99
      FieldValidator('1', FIELD_NAME, errorHandler).isInt(min, max)
      var errors = errorHandler.get()
      expect(errors).to.equal(false)
    })

    it('upper boundary: should return false if passed valid data', function () {
      var min = 1
      var max = 99
      FieldValidator('99', FIELD_NAME, errorHandler).isInt(min, max)
      var errors = errorHandler.get()
      expect(errors).to.equal(false)
    })

    it('lower boundary - 1: should return an error if passed invalid data', function () {
      var min = 1
      var max = 99
      FieldValidator('0', FIELD_NAME, errorHandler).isInt(min, max)
      var errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('upper boundary + 1: should return an error if passed invalid data', function () {
      var min = 1
      var max = 99
      FieldValidator('100', FIELD_NAME, errorHandler).isInt(min, max)
      var errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('whitespace: should return an error if passed invalid data', function () {
      var min = 1
      var max = 99
      FieldValidator(' ', FIELD_NAME, errorHandler).isInt(min, max)
      var errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('string: should return an error if passed invalid data', function () {
      var min = 1
      var max = 99
      FieldValidator('testing', FIELD_NAME, errorHandler).isInt(min, max)
      var errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('partial int: should return an error if passed invalid data', function () {
      var min = 1
      var max = 99
      FieldValidator('£3', FIELD_NAME, errorHandler).isInt(min, max)
      var errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('leading zeros: should return an error if passed a value interpreted as octal', function () {
      var min = 1
      var max = 99
      FieldValidator('072', FIELD_NAME, errorHandler).isInt(min, max)
      var errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })
  })

  describe('isFloat', function () {
  })
})
