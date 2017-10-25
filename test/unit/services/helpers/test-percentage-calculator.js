const expect = require('chai').expect
const percentageCalculator = require('../../../../app/services/helpers/percentage-calculator')

describe('services/helpers/percentage-calculator', function () {
  it('should calculate percentage correctly', function () {
    expect(percentageCalculator.calculatePercentage(5, 10)).to.eql(50)
  })

  it('should return zero when total is zero', function () {
    expect(percentageCalculator.calculatePercentage(5, 0)).to.eql(0)
  })

  it('should return zero when value is zero', function () {
    expect(percentageCalculator.calculatePercentage(0, 10)).to.eql(0)
  })
})
