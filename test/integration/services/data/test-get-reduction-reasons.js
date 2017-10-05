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

var insertedId

describe('services/data/get-reduction-reasons', function () {
  before(function () {
    return helper.getMaxReductionReasonId()
    .then(function (maxId) {
      insertedId = (maxId + 1)
      return helper.addReductionsRefData(maxId)
        .then(function (builtInserts) {
          inserts = builtInserts
        })
    })
  })

  it('should return an array of reductions reasons ref data', function () {
    return getReductionReasons()
      .then(function (results) {
        var reasonIds = []
        results.forEach(function (reason) {
          reasonIds.push(reason.id)
        })
        expect(results).to.contain(Object.assign({}, reductionReasonsRow, { id: insertedId }))
      })
  })

  after(function () {
    return helper.removeInsertedData(inserts)
  })
})
