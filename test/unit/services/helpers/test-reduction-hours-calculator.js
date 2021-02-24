const expect = require('chai').expect
const reductionHoursCalculator = require('../../../../app/services/helpers/reduction-hours-calculator')

const baseReductionReasonsRow = {
  reason: 'Test Reason',
  reason_short_name: 'T',
  category: 'Test Category',
  allowancePercentage: 100,
  maxAllowancePercentage: undefined,
  monthsToExpiry: 6
}

const reductionQueryResults = [
  baseReductionReasonsRow,
  Object.assign({}, baseReductionReasonsRow, { allowancePercentage: 40, maxAllowancePercentage: undefined }),
  Object.assign({}, baseReductionReasonsRow, { allowancePercentage: undefined, maxAllowancePercentage: 50 }),
  Object.assign({}, baseReductionReasonsRow, { allowancePercentage: 47, maxAllowancePercentage: 50 })
]

const reductionWithHoursResults = [
  Object.assign({}, baseReductionReasonsRow, { allowanceHours: 37, maxAllowanceHours: 37 }),
  Object.assign({}, baseReductionReasonsRow, { allowanceHours: 14.8, maxAllowanceHours: 37, allowancePercentage: 40, maxAllowancePercentage: undefined }),
  Object.assign({}, baseReductionReasonsRow, { allowanceHours: 37, maxAllowanceHours: 18.5, allowancePercentage: undefined, maxAllowancePercentage: 50 }),
  Object.assign({}, baseReductionReasonsRow, { allowanceHours: 17.39, maxAllowanceHours: 18.5, allowancePercentage: 47, maxAllowancePercentage: 50 })
]

const woContractedHours = 37

describe('services/helpers/reduction-hours-calculator', function () {
  it('should populate absolute values of reduction allowance hours, for each reason, for the particular offender manager', function () {
    expect(reductionHoursCalculator(reductionQueryResults, woContractedHours)).to.eql(reductionWithHoursResults)
  })
})
