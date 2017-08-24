const expect = require('chai').expect

const insertReduction = require('../../../../app/services/data/insert-reduction')
const Reduction = require('../../../../app/services/domain/new-reduction')
const workloadCapacityHelper = require('../../../helpers/data/aggregated-data-helper')

var reductionResult = {
  table: 'reductions',
  id: 0
}

var testReduction = new Reduction(1, 5, new Date(), new Date(), 'Test Note')
var workloadOwnerId

describe('/services/data/insert-reduction', function () {
  before(function () {
    return workloadCapacityHelper.getAnyExistingWorkloadOwnerId()
      .then(function (result) {
        workloadOwnerId = result.id
        return workloadCapacityHelper.getAnyExistingReductionReasonId()
          .then(function (result) {
            testReduction.reasonForReductionId = result.id
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
