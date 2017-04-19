const expect = require('chai').expect
const ValidationError = require('../../../../app/services/errors/validation-error')
const dateFormatter = require('../../../../app/services/date-formatter')
const UtilisationDate = require('../../../../app/services/domain/utilisation-date')
const CASELOAD_CAPACITY = require('../../../../app/constants/caseload-capacity-enum')


var utilisationDate

describe('services/domain/utilisation-date', function () {
  const VALID_DAY = '01'
  const VALID_MONTH = '01'
  const VALID_YEAR = '2016'
  const VALID_FUTURE_YEAR = '3030'

  const INVALID_DAY = '32'
  const INVALID_MONTH = '13'
  const INVALID_YEAR = ''

  it('should construct a domain object given valid input', function () {
    utilisationDate = new UtilisationDate(
      VALID_DAY,
      VALID_MONTH,
      VALID_YEAR
    )

    expect(utilisationDate.utilisationDate.toString()).to.equal(
      dateFormatter.build(VALID_DAY, VALID_MONTH, VALID_YEAR).toString()
    )
    expect(utilisationDate.fields[0]).to.equal(VALID_DAY)
    expect(utilisationDate.fields[1]).to.equal(VALID_MONTH)
    expect(utilisationDate.fields[2]).to.equal(VALID_YEAR)
  })

  it('should throw ValidationError if a future date was given', function () {
    expect(function () {
      new UtilisationDate(
        VALID_DAY,
        VALID_MONTH,
        VALID_FUTURE_YEAR
      )
    }).to.throw(ValidationError)
  })

  it('should throw ValidationError if date is more than 6 years old', function () {
    expect(function () {
      new UtilisationDate(
        dateFormatter.now().date(),
        dateFormatter.now().month() + 1,
        dateFormatter.now().year() - (CASELOAD_CAPACITY.MAX_HISTORY + 1)
      )
    }).to.throw(ValidationError)
  })

  it('should throw ValidationError if given invalid day', function () {
    expect(function () {
      new UtilisationDate(
        INVALID_DAY,
        VALID_MONTH,
        VALID_YEAR
      )
    }).to.throw(ValidationError)
  })

  it('should throw ValidationError if given invalid month', function () {
    expect(function () {
      new UtilisationDate(
        VALID_DAY,
        INVALID_MONTH,
        VALID_YEAR
      )
    }).to.throw(ValidationError)
  })

  it('should throw ValidationError if given invalid year', function () {
    expect(function () {
      new UtilisationDate(
        VALID_DAY,
        VALID_MONTH,
        INVALID_YEAR
      )
    }).to.throw(ValidationError)
  })

  it('should throw ValidationError if given invalid day, month, and year', function () {
    expect(function () {
      new UtilisationDate(
        INVALID_DAY,
        INVALID_MONTH,
        INVALID_YEAR
      )
    }).to.throw(ValidationError)
  })
})
