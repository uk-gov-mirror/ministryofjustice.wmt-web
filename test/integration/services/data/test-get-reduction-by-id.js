const expect = require('chai').expect

const getReductionById = require('../../../../app/services/data/get-reduction-by-id')
const insertReduction = require('../../../../app/services/data/insert-reduction')
const Reduction = require('../../../../app/services/domain/reduction')
const workloadCapacityHelper = require('../../../helpers/data/aggregated-data-helper')

var reductionResult = {
  table: 'reductions',
  id: 0
}

var testReduction = new Reduction(1, 5, new Date(), new Date(), 'Test Note')
var workloadOwnerId
var addedReductionId

describe('/services/data/get-reduction-by-id', function () {
  before(function () {
    return workloadCapacityHelper.getAnyExistingWorkloadOwnerId()
      .then(function (id) {
        workloadOwnerId = id
        return workloadCapacityHelper.getAnyExistingReductionReasonId()
          .then(function (id) {
            testReduction.reasonForReductionId = id

            return insertReduction(workloadOwnerId, testReduction)
              .then(function (reductionId) {
                addedReductionId = reductionId
              })
          })
      })
  })

  it('should get reduction by id', function () {
    return getReductionById(addedReductionId)
      .then(function (result) {
        // Store the id so that we can delete it after the test is complete
        reductionResult.id = result.id
        expect(result.id).to.be.a('number')
      })
  })

  after(function () {
    return workloadCapacityHelper.removeInsertedData([reductionResult])
  })
})
