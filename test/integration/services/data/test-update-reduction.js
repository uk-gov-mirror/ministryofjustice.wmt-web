const expect = require('chai').expect

const insertReduction = require('../../../../app/services/data/insert-reduction')
const Reduction = require('../../../../app/services/domain/reduction')
const workloadCapacityHelper = require('../../../helpers/data/aggregated-data-helper')
const updateReduction = require('../../../../app/services/data/update-reduction')
const updateReductionStatus = require('../../../../app/services/data/update-reduction-status')
const reductionStatusType = require('../../../../app/constants/reduction-status-type')

var reductionResult = {
  table: 'reductions',
  id: 0
}

var testReduction = new Reduction(1, 5, new Date(), new Date(), 'Test Note', reductionStatusType.ACTIVE)
const updatedReductionNote = 'New test note'
var workloadOwnerId
var addedReductionId

describe('/services/data/update-reduction', function () {
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

  it('should update a reduction and return an id ', function () {
    var updatedReduction = new Reduction(testReduction.reasonForReductionId,
        testReduction.hours,
        testReduction.reductionStartDate,
        testReduction.reductionEndDate,
        testReduction.reasonForReductionId,
        updatedReductionNote,
        testReduction.status)

    return updateReduction(addedReductionId, workloadOwnerId, updatedReduction)
      .then(function (result) {
        // Store the id so that we can delete it after the test is complete
        reductionResult.id = result
        expect(result[0]).to.be.a('number')
        expect(result).to.eql(addedReductionId)
      })
  })

  it('should update a reduction status and return an id ', function () {
    return updateReductionStatus(addedReductionId, workloadOwnerId, reductionStatusType.ARCHIVED)
      .then(function (result) {
        // Store the id so that we can delete it after the test is complete
        reductionResult.id = result
        expect(result[0]).to.be.a('number')
        expect(result).to.eql(addedReductionId)
      })
  })

  after(function () {
    return workloadCapacityHelper.removeInsertedData([reductionResult])
  })
})
