const expect = require('chai').expect
const ERROR_MESSAGES = require('../../../../app/services/validators/validation-error-messages')
const FIELD_NAMES = require('../../../../app/services/validators/validation-field-names')
const dateFormatter = require('../../../../app/services/date-formatter')
const CapacityDateRange = require('../../../../app/services/domain/capacity-date-range')
const CASELOAD_CAPACITY = require('../../../../app/constants/caseload-capacity')

let capacityDateRange

describe('services/domain/capacity-date-range', function () {
  const VALID_FROM_DAY = '01'
  const VALID_FROM_MONTH = '01'
  const VALID_FROM_YEAR = (new Date()).getFullYear() - 2
  const VALID_TO_DAY = '31'
  const VALID_TO_MONTH = '03'
  const VALID_TO_YEAR = (new Date()).getFullYear() - 1
  const VALID_FUTURE_YEAR = (new Date()).getFullYear() + 1

  const INVALID_DAY = '32'
  const INVALID_MONTH = '13'
  const INVALID_YEAR = ''

  it('should construct a domain object given valid input', function () {
    capacityDateRange = new CapacityDateRange(
      VALID_FROM_DAY,
      VALID_FROM_MONTH,
      VALID_FROM_YEAR,
      VALID_TO_DAY,
      VALID_TO_MONTH,
      VALID_TO_YEAR
    )

    expect(capacityDateRange.capacityFromDate.toString()).to.equal(
      dateFormatter.build(VALID_FROM_DAY, VALID_FROM_MONTH, VALID_FROM_YEAR).toString()
    )
    expect(capacityDateRange.capacityToDate.toString()).to.equal(
      dateFormatter.build(VALID_TO_DAY, VALID_TO_MONTH, VALID_TO_YEAR).toString()
    )

    expect(capacityDateRange.fromFields[0]).to.equal(VALID_FROM_DAY)
    expect(capacityDateRange.fromFields[1]).to.equal(VALID_FROM_MONTH)
    expect(capacityDateRange.fromFields[2]).to.equal(VALID_FROM_YEAR)

    expect(capacityDateRange.toFields[0]).to.equal(VALID_TO_DAY)
    expect(capacityDateRange.toFields[1]).to.equal(VALID_TO_MONTH)
    expect(capacityDateRange.toFields[2]).to.equal(VALID_TO_YEAR)
  })

  it('should throw ValidationError if a future date was given for capacity from date', function () {
    expect(function () {
      return new CapacityDateRange(
        VALID_FROM_DAY,
        VALID_FROM_MONTH,
        VALID_FUTURE_YEAR,
        VALID_TO_DAY,
        VALID_TO_MONTH,
        VALID_TO_YEAR
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityFromDate')
      .that.contains(ERROR_MESSAGES.getPastDateMessage(FIELD_NAMES.capacityFromDate))
  })

  it('should throw ValidationError if a future date was given for capacity to date', function () {
    expect(function () {
      return new CapacityDateRange(
        VALID_FROM_DAY,
        VALID_FROM_MONTH,
        VALID_FROM_YEAR,
        VALID_TO_DAY,
        VALID_TO_MONTH,
        VALID_FUTURE_YEAR
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityToDate')
      .that.contains(ERROR_MESSAGES.getPastOrPresentDateMessage(FIELD_NAMES.capacityToDate))
  })

  it('should throw ValidationError if capacity from date is more than 6 years old', function () {
    expect(function () {
      return new CapacityDateRange(
        VALID_FROM_DAY,
        VALID_FROM_MONTH,
        dateFormatter.now().year() - (CASELOAD_CAPACITY.MAX_HISTORY + 1),
        VALID_TO_DAY,
        VALID_TO_MONTH,
        VALID_FUTURE_YEAR
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityFromDate')
      .that.contains(ERROR_MESSAGES.getIsDateLaterThanMessage(FIELD_NAMES.capacityFromDate, { secondaryDisplayName: FIELD_NAMES.maxCapacityHistory }))
  })

  it('should throw ValidationError if capacity to date is more than 6 years old', function () {
    expect(function () {
      return new CapacityDateRange(
        VALID_FROM_DAY,
        VALID_FROM_MONTH,
        VALID_FROM_YEAR,
        VALID_TO_DAY,
        VALID_TO_MONTH,
        dateFormatter.now().year() - (CASELOAD_CAPACITY.MAX_HISTORY + 1)
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityToDate')
      .that.contains(ERROR_MESSAGES.getIsDateLaterThanMessage(FIELD_NAMES.capacityToDate, { secondaryDisplayName: FIELD_NAMES.capacityFromDate }))
  })

  it('should throw ValidationError if given invalid day for capacity from date', function () {
    expect(function () {
      return new CapacityDateRange(
        INVALID_DAY,
        VALID_FROM_MONTH,
        VALID_FROM_YEAR,
        VALID_TO_DAY,
        VALID_TO_MONTH,
        VALID_TO_YEAR
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityFromDate')
      .that.contains(ERROR_MESSAGES.getInvalidDateFormatMessage(FIELD_NAMES.capacityFromDate))
  })

  it('should throw ValidationError if given invalid month for capacity from date', function () {
    expect(function () {
      return new CapacityDateRange(
        VALID_FROM_DAY,
        INVALID_MONTH,
        VALID_FROM_YEAR,
        VALID_TO_DAY,
        VALID_TO_MONTH,
        VALID_TO_YEAR
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityFromDate')
      .that.contains(ERROR_MESSAGES.getInvalidDateFormatMessage(FIELD_NAMES.capacityFromDate))
  })

  it('should throw ValidationError if given invalid year for capacity from date', function () {
    expect(function () {
      return new CapacityDateRange(
        VALID_FROM_DAY,
        VALID_FROM_MONTH,
        INVALID_YEAR,
        VALID_TO_DAY,
        VALID_TO_MONTH,
        VALID_TO_YEAR
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityFromDate')
      .that.contains(ERROR_MESSAGES.getInvalidDateFormatMessage(FIELD_NAMES.capacityFromDate))
  })

  it('should throw ValidationError if given invalid day for capacity to date', function () {
    expect(function () {
      return new CapacityDateRange(
        VALID_FROM_DAY,
        VALID_FROM_MONTH,
        VALID_FROM_YEAR,
        INVALID_DAY,
        VALID_TO_MONTH,
        VALID_TO_YEAR
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityToDate')
      .that.contains(ERROR_MESSAGES.getInvalidDateFormatMessage(FIELD_NAMES.capacityToDate))
  })

  it('should throw ValidationError if given invalid month for capacity to date', function () {
    expect(function () {
      return new CapacityDateRange(
        VALID_FROM_DAY,
        VALID_FROM_MONTH,
        VALID_FROM_YEAR,
        VALID_TO_DAY,
        INVALID_MONTH,
        VALID_TO_YEAR
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityToDate')
      .that.contains(ERROR_MESSAGES.getInvalidDateFormatMessage(FIELD_NAMES.capacityToDate))
  })

  it('should throw ValidationError if given invalid year for capacity to date', function () {
    expect(function () {
      return new CapacityDateRange(
        VALID_FROM_DAY,
        VALID_FROM_MONTH,
        VALID_FROM_YEAR,
        VALID_TO_DAY,
        VALID_TO_MONTH,
        INVALID_YEAR
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityToDate')
      .that.contains(ERROR_MESSAGES.getInvalidDateFormatMessage(FIELD_NAMES.capacityToDate))
  })

  it('should throw ValidationError if given invalid day, month, and year for capacity from date', function () {
    expect(function () {
      return new CapacityDateRange(
        INVALID_DAY,
        INVALID_MONTH,
        INVALID_YEAR,
        VALID_TO_DAY,
        VALID_TO_MONTH,
        VALID_TO_YEAR
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityFromDate')
      .that.contains(ERROR_MESSAGES.getInvalidDateFormatMessage(FIELD_NAMES.capacityFromDate))
  })

  it('should throw ValidationError if given invalid day, month, and year for capacity to date', function () {
    expect(function () {
      return new CapacityDateRange(
        VALID_FROM_DAY,
        VALID_FROM_MONTH,
        VALID_FROM_YEAR,
        INVALID_DAY,
        INVALID_MONTH,
        INVALID_YEAR
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityToDate')
      .that.contains(ERROR_MESSAGES.getInvalidDateFormatMessage(FIELD_NAMES.capacityToDate))
  })

  it('should throw ValidationError if given a capacity from date that is greater than the capacity to date', function () {
    expect(function () {
      return new CapacityDateRange(
        VALID_TO_DAY,
        VALID_TO_MONTH,
        VALID_TO_YEAR,
        VALID_FROM_DAY,
        VALID_FROM_MONTH,
        VALID_FROM_YEAR
      )
    }).to.throw()
      .that.contains.a.property('validationErrors')
      .that.contains.a.property('capacityToDate')
      .that.contains(ERROR_MESSAGES.getIsDateLaterThanMessage(FIELD_NAMES.capacityToDate, { secondaryDisplayName: FIELD_NAMES.capacityFromDate }))
  })
})
