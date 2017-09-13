const expect = require('chai').expect

const insertReduction = require('../../../../app/services/data/insert-reduction')
const Reduction = require('../../../../app/services/domain/reduction')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const updateReductionStatus = require('../../../../app/services/data/update-reduction-status')
const reductionStatusType = require('../../../../app/constants/reduction-status-type')
const getReductionById = require('../../../../app/services/data/get-reduction-by-id')

var reductionResult = {
  table: 'reductions',
  id: 0
}

var testReduction = new Reduction(1, 5, new Date(), new Date(), 'Test Note', reductionStatusType.ACTIVE)
var workloadOwnerId
var addedReductionId
var inserts = []

describe('/services/data/update-reduction-status', function () {
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
                  reductionResult.id = addedReductionId[0]
                })
            })
        })
    })
  })

  it('should update a reduction status and return an id ', function () {
    return updateReductionStatus(addedReductionId, reductionStatusType.ARCHIVED)
      .then(function (result) {
        expect(result[0]).to.be.a('number')
        expect(result).to.eql(addedReductionId)
      })
  })

  it('should get the updated reduction status', function () {
    return getReductionById(addedReductionId)
      .then(function (result) {
        expect(result.id).to.eql(addedReductionId[0])
        expect(result.status).to.be.equal(reductionStatusType.ARCHIVED)
      })
  })

  after(function () {
    inserts.push(reductionResult)
    return dataHelper.removeInsertedData(inserts)
  })
})
