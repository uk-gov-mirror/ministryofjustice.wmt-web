const expect = require('chai').expect

const helper = require('../../../helpers/data/ref-data-helper')
const getReductionReasons = require('../../../../app/services/data/get-reduction-reasons')

var inserts = []

var reductionReasonsRow = {
  category: 'Test Category 1',
  reason: 'Test Reason 1',
  reasonShortName: '1',
  allowancePercentage: 20,
  maxAllowancePercentage: null,
  monthsToExpiry: 6
}

describe('services/data/get-reduction-reasons', function () {
  before(function () {
    return helper.addReductionsRefData()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should return an array of reductions reasons ref data, including category', function () {
    return getReductionReasons()
      .then(function (results) {
        expect(results).to.contain(reductionReasonsRow)
        expect(results).to.contain(Object.assign({}, reductionReasonsRow, { reason: 'Test Reason 2', reasonShortName: '2' }))
        expect(results).to.contain(Object.assign({}, reductionReasonsRow, { category: 'Test Category 2' }))
        expect(results).to.contain(Object.assign({}, reductionReasonsRow, { category: 'Test Category 2', reason: 'Test Reason 2', reasonShortName: '2' }))
      })
  })

  after(function () {
    return helper.removeInsertedData(inserts)
  })
})
