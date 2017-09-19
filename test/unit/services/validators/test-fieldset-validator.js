const expect = require('chai').expect
const FieldsetValidator = require('../../../../app/services/validators/fieldset-validator')
const ErrorHandler = require('../../../../app/services/validators/error-handler')
const ERROR_MESSAGES = require('../../../../app/services/validators/validation-error-messages')
const dateFormatter = require('../../../../app/services/date-formatter')

describe('services/validators/fieldset-validator', function () {
  const VALID_DATA_ITEM_1 = 'data 1'
  const VALID_DATA_ITEM_2 = 'data 2'
  const INVALID_DATA_ITEM_1 = ''
  const DATA = [
    VALID_DATA_ITEM_1,
    VALID_DATA_ITEM_2,
    INVALID_DATA_ITEM_1
  ]
  const FIELD_NAME = 'field name'
  const ERROR_HANDLER = ErrorHandler()

  beforeEach(function () {
    this.error = ErrorHandler()
    this.fieldsetValidator = FieldsetValidator(DATA, FIELD_NAME, this.error)
  })

  describe('isRequired', function () {
    it('should return false if data is null', function () {
      FieldsetValidator(null, FIELD_NAME, ERROR_HANDLER)
        .isRequired()
      var errors = ERROR_HANDLER.get()
      expect(errors).to.be.equal(false)
    })

    it('should return false if data is undefined', function () {
      FieldsetValidator(undefined, FIELD_NAME, ERROR_HANDLER)
        .isRequired()
      var errors = ERROR_HANDLER.get()
      expect(errors).to.be.equal(false)
    })

    it('should return false if data is an object', function () {
      FieldsetValidator({}, FIELD_NAME, ERROR_HANDLER)
        .isRequired()
      var errors = ERROR_HANDLER.get()
      expect(errors).to.be.equal(false)
    })

    it('should return an error object if passed an array containing invalid data', function () {
      FieldsetValidator(DATA, FIELD_NAME, ERROR_HANDLER)
        .isRequired()
      var errors = ERROR_HANDLER.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return an error object with specific message if passed an array containing invalid data', function () {
      FieldsetValidator(DATA, FIELD_NAME, ERROR_HANDLER)
        .isRequired(ERROR_MESSAGES.getIsRequired)
      var errors = ERROR_HANDLER.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME]).to.include(ERROR_MESSAGES.getIsRequired())
    })

    it('should return the fieldsetValidator after being called to allow function chaining.', function () {
      var result = this.fieldsetValidator.isRequired()
      expect(result).to.be.equal(this.fieldsetValidator)
    })
  })

  describe('isFutureDate', function () {
    const PAST_DATE = dateFormatter.now().subtract(1, 'day')
    const FUTURE_DATE = dateFormatter.now().add(1, 'day')

    it('should return error object if data is null', function () {
      this.fieldsetValidator.isFutureDate(null)
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return error object if data is undefined', function () {
      this.fieldsetValidator.isFutureDate(undefined)
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return error object if data is not a valid date object', function () {
      this.fieldsetValidator.isFutureDate({})
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return error object if the date given is in the past', function () {
      this.fieldsetValidator.isFutureDate(PAST_DATE)
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return false if the date given is in the past', function () {
      this.fieldsetValidator.isFutureDate(FUTURE_DATE)
      var errors = this.error.get()
      expect(errors).to.equal(false)
    })

    it('should return the fieldsetValidator after being called to allow function chaining.', function () {
      var result = this.fieldsetValidator.isFutureDate(dateFormatter.now())
      expect(result).to.be.equal(this.fieldsetValidator)
    })
  })
})
