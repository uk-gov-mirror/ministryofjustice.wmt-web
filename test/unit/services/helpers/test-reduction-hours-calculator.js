const expect = require('chai').expect
const reductionHoursCalculator = require('../../../../app/services/helpers/reduction-hours-calculator')

var baseReductionReasonsRow = {
  reason: 'Test Reason',
  reason_short_name: 'T',
  category: 'Test Category',
  allowance_percentage: 100,
  max_allowance_percentage: undefined,
  months_to_expiry: 6
}

var reductionQueryResults = [
  baseReductionReasonsRow,
  Object.assign({}, baseReductionReasonsRow, { allowance_percentage: 40, max_allowance_percentage: undefined }),
  Object.assign({}, baseReductionReasonsRow, { allowance_percentage: undefined, max_allowance_percentage: 50 }),
  Object.assign({}, baseReductionReasonsRow, { allowance_percentage: 47, max_allowance_percentage: 50 })
]

var reductionWithHoursResults = [
  Object.assign({}, baseReductionReasonsRow, { allowance_hours: 37, max_allowance_hours: undefined }),
  Object.assign({}, baseReductionReasonsRow, { allowance_hours: 14.8, max_allowance_hours: undefined, allowance_percentage: 40, max_allowance_percentage: undefined }),
  Object.assign({}, baseReductionReasonsRow, { allowance_hours: undefined, max_allowance_hours: 18.5, allowance_percentage: undefined, max_allowance_percentage: 50 }),
  Object.assign({}, baseReductionReasonsRow, { allowance_hours: 17.39, max_allowance_hours: 18.5, allowance_percentage: 47, max_allowance_percentage: 50 })
]

var woContractedHours = 37

describe('services/helpers/reduction-hours-calculator', function () {
  it('should popluate absolute values of reduction allowance hours, for each reason, for the particular offender manager', function () {
    expect(reductionHoursCalculator(reductionQueryResults, woContractedHours)).to.eql(reductionWithHoursResults)
  })
})
