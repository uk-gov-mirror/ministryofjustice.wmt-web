const expect = require('chai').expect
const validator = require('../../../../app/services/validators/common-validator')
const dateFormatter = require('../../../../app/services/date-formatter')
const CASELOAD_CAPACITY = require('../../../../app/constants/caseload-capacity')

describe('services/validators/common-validator', function () {
  describe('isNullOrUndefined', function () {
    it('should return true if passed null', function () {
      var result = validator.isNullOrUndefined(null)
      expect(result).to.equal(true)
    })

    it('should return true if passed undefined', function () {
      var result = validator.isNullOrUndefined(undefined)
      expect(result).to.equal(true)
    })

    it('should return false if passed an object', function () {
      var result = validator.isNullOrUndefined({})
      expect(result).to.equal(false)
    })

    it('should return false if passed an array', function () {
      var result = validator.isNullOrUndefined([])
      expect(result).to.equal(false)
    })

    it('should return false if passed a non empty string', function () {
      var result = validator.isNullOrUndefined('any string')
      expect(result).to.equal(false)
    })
  })

  describe('isValidDate', function () {
    it('should return false if passed null', function () {
      var result = validator.isValidDate(null)
      expect(result).to.equal(false)
    })

    it('should return false if passed undefined', function () {
      var result = validator.isValidDate(undefined)
      expect(result).to.equal(false)
    })

    it('should return false if passed an object', function () {
      var result = validator.isValidDate({})
      expect(result).to.equal(false)
    })

    it('should return false if passed a blank string', function () {
      var result = validator.isValidDate('')
      expect(result).to.equal(false)
    })

    it('should return true if passed a valid Date object', function () {
      var result = validator.isValidDate(dateFormatter.now())
      expect(result).to.equal(true)
    })
  })

  describe('isDateInThePast', function () {
    const PAST_DATE = dateFormatter.now().subtract(1, 'day')
    const FUTURE_DATE = dateFormatter.now().add(1, 'day')

    it('should return false if passed null', function () {
      var result = validator.isDateInThePast(null)
      expect(result).to.equal(false)
    })

    it('should return false if passed undefined', function () {
      var result = validator.isDateInThePast(undefined)
      expect(result).to.equal(false)
    })

    it('should return false if passed an object', function () {
      var result = validator.isDateInThePast({})
      expect(result).to.equal(false)
    })

    it('should return true if passed a valid Date object', function () {
      var result = validator.isDateInThePast(PAST_DATE)
      expect(result).to.equal(true)
    })

    it('should return false if passed an invalid Date object', function () {
      var result = validator.isDateInThePast(FUTURE_DATE)
      expect(result).to.equal(false)
    })
  })

  describe('isDateOlderThanMaxHistory', function () {
    const GREATER_THAN_MAX_HISTORY_LIMIT = dateFormatter.now().subtract(CASELOAD_CAPACITY.MAX_HISTORY + 1, 'years')
    const EXACTLY_MAX_HISTORY_LIMIT = dateFormatter.now().subtract(CASELOAD_CAPACITY.MAX_HISTORY, 'years')
    const LESS_THAN_MAX_HISTORY_LIMIT = dateFormatter.now().subtract(CASELOAD_CAPACITY.MAX_HISTORY, 'years').add(1, 'days')

    it('should return false if passed null', function () {
      var result = validator.isDateOlderThanMaxHistory(null)
      expect(result).to.equal(false)
    })

    it('should return false if passed undefined', function () {
      var result = validator.isDateOlderThanMaxHistory(undefined)
      expect(result).to.equal(false)
    })

    it('should return false if passed an object', function () {
      var result = validator.isDateOlderThanMaxHistory({})
      expect(result).to.equal(false)
    })

    it(`should return false if passed a date that is less than ${CASELOAD_CAPACITY.MAX_HISTORY} years ago.`, function () {
      var result = validator.isDateOlderThanMaxHistory(LESS_THAN_MAX_HISTORY_LIMIT)
      expect(result).to.equal(false)
    })

    it(`should return false if passed a date that is exactly ${CASELOAD_CAPACITY.MAX_HISTORY} years ago.`, function () {
      var result = validator.isDateOlderThanMaxHistory(EXACTLY_MAX_HISTORY_LIMIT)
      expect(result).to.equal(false)
    })

    it(`should return true if passed a date that is greater than ${CASELOAD_CAPACITY.MAX_HISTORY} years ago.`, function () {
      var result = validator.isDateOlderThanMaxHistory(GREATER_THAN_MAX_HISTORY_LIMIT)
      expect(result).to.equal(true)
    })
  })
})
