const expect = require('chai').expect
const moment = require('moment')
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
        .isRequired(ERROR_MESSAGES.getIsRequiredMessage)
      var errors = ERROR_HANDLER.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME]).to.include(ERROR_MESSAGES.getIsRequiredMessage())
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

    it('should return false if the date given is in the future', function () {
      this.fieldsetValidator.isFutureDate(FUTURE_DATE)
      var errors = this.error.get()
      expect(errors).to.equal(false)
    })

    it('should return the fieldsetValidator after being called to allow function chaining.', function () {
      var result = this.fieldsetValidator.isFutureDate(dateFormatter.now())
      expect(result).to.be.equal(this.fieldsetValidator)
      console.log(result)
    })
  })

  describe('isValidDate', function () {
    it('should return false if passed a valid date', function () {
      this.fieldsetValidator.isValidDate(dateFormatter.now())
      var errors = this.error.get()
      expect(errors).to.equal(false)
    })

    it('should return error object if data is not a valid date object', function () {
      this.fieldsetValidator.isValidDate({})
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME][0]).to.include('was invalid')
    })

    it('should return error object if data is null', function () {
      this.fieldsetValidator.isValidDate(null)
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME][0]).to.include('was invalid')
    })

    it('should return error object if data is undefined', function () {
      this.fieldsetValidator.isValidDate(undefined)
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME][0]).to.include('was invalid')
    })

    it('should return error object if date is outside the valid range', function () {
      this.fieldsetValidator.isValidDate(dateFormatter.now().add(82, 'years'))
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME][0]).to.include('was invalid')
    })

    it('should return false if date is within the valid range', function () {
      this.fieldsetValidator.isValidDate(dateFormatter.now().add(81, 'years'))
      var errors = this.error.get()
      expect(errors).to.equal(false)
    })
  })

  describe('isLaterThan', function () {
    it('should return false if end date is greater than start date', function () {
      var startDate = moment().add(1, 'days').toDate()
      var endDate = moment().add(2, 'days').toDate()
      this.fieldsetValidator.isLaterThan(startDate, endDate)
      var errors = this.error.get()
      expect(errors).to.equal(false)
    })

    it('should return false if end date is greater than start date', function () {
      var startDate = moment().add(2, 'days').toDate()
      var endDate = moment().add(1, 'days').toDate()
      this.fieldsetValidator.isLaterThan(startDate, endDate)
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME][0]).to.include('must be after the start date')
    })
  })
})
