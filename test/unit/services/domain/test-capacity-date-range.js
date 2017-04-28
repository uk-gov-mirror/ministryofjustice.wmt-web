const expect = require('chai').expect
const dateFormatter = require('../../../../app/services/date-formatter')
const CapacityDateRange = require('../../../../app/services/domain/capacity-date-range')

var capacityDateRange

describe('services/domain/capacity-date-range', function () {
  const VALID_FROM_DAY = '01'
  const VALID_FROM_MONTH = '01'
  const VALID_FROM_YEAR = '2017'
  const VALID_TO_DAY = '31'
  const VALID_TO_MONTH = '03'
  const VALID_TO_YEAR = '2017'

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
})
