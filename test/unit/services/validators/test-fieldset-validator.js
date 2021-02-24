const expect = require('chai').expect
const FieldsetValidator = require('../../../../app/services/validators/fieldset-validator')
const ErrorHandler = require('../../../../app/services/validators/error-handler')
const ERROR_MESSAGES = require('../../../../app/services/validators/validation-error-messages')
const dateFormatter = require('../../../../app/services/date-formatter')

describe('services/validators/fieldset-validator', function () {
  const PAST_DATE = dateFormatter.now().subtract(1, 'day').toDate()
  const PAST_DATE_ARRAY = [
    PAST_DATE.getDate(),
    PAST_DATE.getMonth() + 1,
    PAST_DATE.getFullYear()
  ]
  const PRESENT_DATE = dateFormatter.now().toDate()
  const PRESENT_DATE_ARRAY = [
    PRESENT_DATE.getDate(),
    PRESENT_DATE.getMonth() + 1,
    PRESENT_DATE.getFullYear()
  ]
  const FUTURE_DATE = dateFormatter.now().add(1, 'day').toDate()
  const FUTURE_DATE_ARRAY = [
    FUTURE_DATE.getDate(),
    FUTURE_DATE.getMonth() + 1,
    FUTURE_DATE.getFullYear()
  ]
  const VALID_DATA_ITEM_1 = 'data 1'
  const VALID_DATA_ITEM_2 = 'data 2'
  const INVALID_DATA_ITEM_1 = ''
  const DATA = [
    VALID_DATA_ITEM_1,
    VALID_DATA_ITEM_2,
    INVALID_DATA_ITEM_1
  ]
  const FIELD_NAME = 'field name'
  let errorHandler = ErrorHandler()

  beforeEach(function () {
    errorHandler = ErrorHandler()
  })

  describe('isRequired', function () {
    it('should return false if data is a 3 item array', function () {
      FieldsetValidator([1, 2, 3], FIELD_NAME, errorHandler)
        .isRequired()
      const errors = errorHandler.get()
      expect(errors).to.eql(false)
    })

    it('should return an error object if data is null', function () {
      FieldsetValidator(null, FIELD_NAME, errorHandler)
        .isRequired()
      const errors = errorHandler.get()
      expect(errors)
        .to.have.a.property(FIELD_NAME)
        .that.contains(ERROR_MESSAGES.getIsRequiredMessage())
    })

    it('should return an error object if data is undefined', function () {
      FieldsetValidator(undefined, FIELD_NAME, errorHandler)
        .isRequired()
      const errors = errorHandler.get()
      expect(errors)
        .to.have.a.property(FIELD_NAME)
        .that.contains(ERROR_MESSAGES.getIsRequiredMessage())
    })

    it('should return an error object if data is an object', function () {
      FieldsetValidator({}, FIELD_NAME, errorHandler)
        .isRequired()
      const errors = errorHandler.get()
      expect(errors)
        .to.have.a.property(FIELD_NAME)
        .that.contains(ERROR_MESSAGES.getIsRequiredMessage())
    })

    it('should return an error object if passed an array containing invalid data', function () {
      FieldsetValidator(DATA, FIELD_NAME, errorHandler)
        .isRequired()
      const errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return an error object with specific message if passed an array containing invalid data', function () {
      FieldsetValidator(DATA, FIELD_NAME, errorHandler)
        .isRequired(ERROR_MESSAGES.getIsRequiredMessage)
      const errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME]).to.include(ERROR_MESSAGES.getIsRequiredMessage())
    })

    it('should return the fieldsetValidator after being called to allow function chaining.', function () {
      const fieldsetValidator = FieldsetValidator(DATA, FIELD_NAME, errorHandler)
      const result = fieldsetValidator.isRequired()
      expect(result).to.be.equal(fieldsetValidator)
    })
  })

  describe('isFutureDate', function () {
    it('should return error object if data is null', function () {
      FieldsetValidator(null, FIELD_NAME, errorHandler)
        .isFutureDate()
      const errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return error object if data is undefined', function () {
      FieldsetValidator(undefined, FIELD_NAME, errorHandler)
        .isFutureDate()
      const errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return error object if data is not a valid date object', function () {
      FieldsetValidator([31, 2, 3000], FIELD_NAME, errorHandler)
        .isFutureDate()
      const errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return error object if the date given is in the past', function () {
      FieldsetValidator(PAST_DATE_ARRAY, FIELD_NAME, errorHandler)
        .isFutureDate()
      const errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
    })

    it('should return false if the date given is in the future', function () {
      FieldsetValidator(FUTURE_DATE_ARRAY, FIELD_NAME, errorHandler)
        .isFutureDate()
      const errors = errorHandler.get()
      expect(errors).to.equal(false)
    })

    it('should return the fieldsetValidator after being called to allow function chaining.', function () {
      const fieldsetValidator = FieldsetValidator(FUTURE_DATE_ARRAY, FIELD_NAME, errorHandler)
      const result = fieldsetValidator
        .isFutureDate()
      expect(result).to.be.equal(fieldsetValidator)
    })
  })

  describe('isValidDate', function () {
    it('should return false if passed a valid date', function () {
      const dateNow = dateFormatter.now().toDate()
      const dateNowArray = [dateNow.getDate(), dateNow.getMonth() + 1, dateNow.getFullYear()]
      FieldsetValidator(dateNowArray, FIELD_NAME, errorHandler)
        .isValidDate()
      const errors = errorHandler.get()
      expect(errors).to.equal(false)
    })

    it('should return error object if data is not a valid date object', function () {
      FieldsetValidator({}, FIELD_NAME, errorHandler)
        .isValidDate()
      const errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME][0]).to.include('was invalid')
    })

    it('should return error object if data is null', function () {
      FieldsetValidator(null, FIELD_NAME, errorHandler)
        .isValidDate()
      const errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME][0]).to.include('was invalid')
    })

    it('should return error object if data is undefined', function () {
      FieldsetValidator(undefined, FIELD_NAME, errorHandler)
        .isValidDate()
      const errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME][0]).to.include('was invalid')
    })

    it('should return error object if date is outside the valid range', function () {
      const invalidDate = dateFormatter.now().add(82, 'years').toDate()
      const invalidDateArray = [invalidDate.getDate(), invalidDate.getMonth() + 1, invalidDate.getFullYear()]
      FieldsetValidator(invalidDateArray, FIELD_NAME, errorHandler)
        .isValidDate()
      const errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME][0]).to.include('was invalid')
    })

    it('should return false if date is within the valid range', function () {
      const validDate = dateFormatter.now().add(50, 'years').toDate()
      const validDateArray = [validDate.getDate(), validDate.getMonth() + 1, validDate.getFullYear()]
      FieldsetValidator(validDateArray, FIELD_NAME, errorHandler)
        .isValidDate()
      const errors = errorHandler.get()
      expect(errors).to.equal(false)
    })
  })

  describe('isPastOrPresentDate', function () {
    it('should return error object if the date given is in the future', function () {
      FieldsetValidator(FUTURE_DATE_ARRAY, FIELD_NAME, errorHandler)
        .isPastOrPresentDate()
      const errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
        .that.contains(ERROR_MESSAGES.getPastOrPresentDateMessage())
    })

    it('should return false if the date given is in the past', function () {
      FieldsetValidator(PAST_DATE_ARRAY, FIELD_NAME, errorHandler)
        .isPastOrPresentDate()
      const errors = errorHandler.get()
      expect(errors).to.equal(false)
    })

    it('should return false if the date given is in the past', function () {
      FieldsetValidator(PRESENT_DATE_ARRAY, FIELD_NAME, errorHandler)
        .isPastOrPresentDate()
      const errors = errorHandler.get()
      expect(errors).to.equal(false)
    })

    it('should return the fieldsetValidator after being called to allow function chaining.', function () {
      const fieldsetValidator = FieldsetValidator(FUTURE_DATE_ARRAY, FIELD_NAME, errorHandler)
      const result = fieldsetValidator
        .isPastOrPresentDate()
      expect(result).to.be.equal(fieldsetValidator)
    })
  })

  describe('isLaterThan', function () {
    it('should return false if end date is greater than start date', function () {
      FieldsetValidator(FUTURE_DATE_ARRAY, FIELD_NAME, errorHandler)
        .isLaterThan(PAST_DATE)
      const errors = errorHandler.get()
      expect(errors).to.equal(false)
    })

    it('should return false if end date is greater than start date', function () {
      FieldsetValidator(PAST_DATE_ARRAY, FIELD_NAME, errorHandler)
        .isLaterThan(FUTURE_DATE, FIELD_NAME)
      const errors = errorHandler.get()
      expect(errors).to.have.property(FIELD_NAME)
      expect(errors[FIELD_NAME][0]).to.include('must be after')
    })
  })
})
