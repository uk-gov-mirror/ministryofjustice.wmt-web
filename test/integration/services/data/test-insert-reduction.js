const expect = require('chai').expect

const insertReduction = require('../../../../app/services/data/insert-reduction')
const Reduction = require('../../../../app/services/domain/reduction')
const workloadCapacityHelper = require('../../../helpers/data/aggregated-data-helper')
const reductionStatusType = require('../../../../app/constants/reduction-status-type')

var reductionResult = {
  table: 'reductions',
  id: 0
}

var testReduction = new Reduction(1, 5, new Date(), new Date(), 'Test Note', reductionStatusType.ACTIVE)
var workloadOwnerId

describe('/services/data/insert-reduction', function () {
  before(function () {
    return workloadCapacityHelper.getAnyExistingWorkloadOwnerId()
      .then(function (id) {
        workloadOwnerId = id
        return workloadCapacityHelper.getAnyExistingReductionReasonId()
          .then(function (id) {
            testReduction.reasonForReductionId = id
          })
      })
  })
  it('should return an id when a valid reduction has been added', function () {
    return insertReduction(workloadOwnerId, testReduction)
      .then(function (result) {
        // Store the id so that we can delete it after the test is complete
        reductionResult.id = result
        expect(result[0]).to.be.a('number')
      })
  })

  after(function () {
    return workloadCapacityHelper.removeInsertedData([reductionResult])
  })
})
