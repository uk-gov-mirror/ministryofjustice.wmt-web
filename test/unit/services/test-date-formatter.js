const expect = require('chai').expect
const dateFormatter = require('../../../app/services/date-formatter')
const moment = require('moment')
const DATE_FORMAT = 'YYYY-MM-DD'
const INVALID_DATE_ERROR = 'Invalid date'

describe('services/date-formatter', function () {
  const VALID_DAY = '01'
  const VALID_MONTH = '01'
  const VALID_YEAR = '2000'
  const EXPECTED_DATE = moment([VALID_YEAR, VALID_MONTH, VALID_DAY], DATE_FORMAT)

  const INVALID_DAY = '55'
  const INVALID_MONTH = '55'
  const INVALID_YEAR = 'invalid year'

  describe('build', function () {
    it('should return string in expected format', function () {
      const result = dateFormatter.build(VALID_DAY, VALID_MONTH, VALID_YEAR)
      expect(result.format(DATE_FORMAT)).to.equal(EXPECTED_DATE.format(DATE_FORMAT))
    })

    it('should return error if passed null', function () {
      const result = dateFormatter.build(null, null, null)
      expect(result.toString()).to.equal(INVALID_DATE_ERROR)
    })

    it('should return error if passed undefined', function () {
      const result = dateFormatter.build(undefined, undefined, undefined)
      expect(result.toString()).to.equal(INVALID_DATE_ERROR)
    })

    it('should return error if passed a non valid day value (1 - 31)', function () {
      const result = dateFormatter.build(INVALID_DAY, VALID_MONTH, VALID_YEAR)
      expect(result.toString()).to.equal(INVALID_DATE_ERROR)
    })

    it('should return error if passed a non valid month value (1 - 12)', function () {
      const result = dateFormatter.build(VALID_DAY, INVALID_MONTH, VALID_YEAR)
      expect(result.toString()).to.equal(INVALID_DATE_ERROR)
    })

    it('should return error if passed a non valid year value (not a number)', function () {
      const result = dateFormatter.build(VALID_DAY, VALID_MONTH, INVALID_YEAR)
      expect(result.toString()).to.equal(INVALID_DATE_ERROR)
    })
  })
})
