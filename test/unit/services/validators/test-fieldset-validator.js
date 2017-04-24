const expect = require('chai').expect
const FieldsetValidator = require('../../../../app/services/validators/fieldset-validator')
const ErrorHandler = require('../../../../app/services/validators/error-handler')
const ERROR_MESSAGES = require('../../../../app/services/validators/validation-error-messages')
const dateFormatter = require('../../../../app/services/date-formatter')
const CASELOAD_CAPACITY = require('../../../../app/constants/caseload-capacity')

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

    it('should return the fieldsetValidator after being called to allow function chaining.', function () {
      var result = this.fieldsetValidator.isRequired()
      expect(result).to.be.equal(this.fieldsetValidator)
    })
  })

  describe('isValidDate', function () {
    it('should return error object if data is null', function () {
      this.fieldsetValidator.isValidDate(null)
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return error object if data is undefined', function () {
      this.fieldsetValidator.isValidDate(undefined)
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return error object if data is not a valid date object', function () {
      this.fieldsetValidator.isValidDate({})
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return false if the date given is valid', function () {
      this.fieldsetValidator.isValidDate(dateFormatter.now().subtract(18, 'years'))
      var errors = this.error.get()
      expect(errors).to.equal(false)
    })

    it('should return the fieldsetValidator after being called to allow function chaining.', function () {
      var result = this.fieldsetValidator.isValidDate(dateFormatter.now())
      expect(result).to.be.equal(this.fieldsetValidator)
    })
  })

  describe('isPastDate', function () {
    const PAST_DATE = dateFormatter.now().subtract(1, 'day')
    const FUTURE_DATE = dateFormatter.now().add(1, 'day')

    it('should return error object if data is null', function () {
      this.fieldsetValidator.isPastDate(null)
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return error object if data is undefined', function () {
      this.fieldsetValidator.isPastDate(undefined)
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return error object if data is not a valid date object', function () {
      this.fieldsetValidator.isPastDate({})
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return error object if the date given is in the future', function () {
      this.fieldsetValidator.isPastDate(FUTURE_DATE)
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return false if the date given is in the past', function () {
      this.fieldsetValidator.isPastDate(PAST_DATE)
      var errors = this.error.get()
      expect(errors).to.equal(false)
    })

    it('should return the fieldsetValidator after being called to allow function chaining.', function () {
      var result = this.fieldsetValidator.isPastDate(dateFormatter.now())
      expect(result).to.be.equal(this.fieldsetValidator)
    })
  })

  describe('isOlderThanMaxHistory', function () {
    const GREATER_THAN_MAX_HISTORY_LIMIT = dateFormatter.now().subtract(CASELOAD_CAPACITY.MAX_HISTORY + 1, 'years')
    const EXACTLY_MAX_HISTORY_LIMIT = dateFormatter.now().subtract(CASELOAD_CAPACITY.MAX_HISTORY, 'years')
    const LESS_THAN_MAX_HISTORY_LIMIT = dateFormatter.now().subtract(CASELOAD_CAPACITY.MAX_HISTORY, 'years').add(1, 'days')

    it(`should return error object if the date is more than ${CASELOAD_CAPACITY.MAX_HISTORY} years ago.`, function () {
      this.fieldsetValidator.isOlderThanMaxHistory(GREATER_THAN_MAX_HISTORY_LIMIT)
      var errors = this.error.get()
      expect(errors).to.have.property(FIELD_NAME)
    })


    it(`should return false if the date given is less than ${CASELOAD_CAPACITY.MAX_HISTORY} years ago.`, function () {
      this.fieldsetValidator.isOlderThanMaxHistory(LESS_THAN_MAX_HISTORY_LIMIT)
      var errors = this.error.get()
      expect(errors).to.equal(false)
    })

    it(`should return false if the date given is exactly ${CASELOAD_CAPACITY.MAX_HISTORY} years ago.`, function () {
      this.fieldsetValidator.isOlderThanMaxHistory(EXACTLY_MAX_HISTORY_LIMIT)
      var errors = this.error.get()
      expect(errors).to.equal(false)
    })

    it('should return the fieldsetValidator after being called to allow function chaining.', function () {
      var result = this.fieldsetValidator.isOlderThanMaxHistory(LESS_THAN_MAX_HISTORY_LIMIT)
      expect(result).to.be.equal(this.fieldsetValidator)
    })
  })
})
