const expect = require('chai').expect

const getReductionById = require('../../../../app/services/data/get-reduction-by-id')
const insertReduction = require('../../../../app/services/data/insert-reduction')
const Reduction = require('../../../../app/services/domain/reduction')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const reductionStatusType = require('../../../../app/constants/reduction-status-type')

var reductionResult = {
  table: 'reductions',
  id: 0
}

var testReduction = new Reduction(1, 5, new Date(), new Date(), 'Test Note', reductionStatusType.ACTIVE)
var workloadOwnerId
var addedReductionId
var inserts = []

describe('/services/data/get-reduction-by-id', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
    .then(function (result) {
      inserts = result
      return dataHelper.getAnyExistingWorkloadOwnerId()
        .then(function (id) {
          workloadOwnerId = id
          return dataHelper.getAnyExistingReductionReasonId()
            .then(function (id) {
              testReduction.reasonForReductionId = id
              return insertReduction(workloadOwnerId, testReduction)
                .then(function (reductionId) {
                  addedReductionId = reductionId
                })
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
    inserts.push(reductionResult)
    return dataHelper.removeInsertedData(inserts)
  })
})
