const expect = require('chai').expect
const moment = require('moment')
const insertReduction = require('../../../../app/services/data/insert-reduction')
const Reduction = require('../../../../app/services/domain/reduction')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const updateReductionStatus = require('../../../../app/services/data/update-reduction-status')
const reductionStatusType = require('../../../../app/constants/reduction-status-type')
const getReductionById = require('../../../../app/services/data/get-reduction-by-id')

const reductionResult = {
  table: 'reductions',
  id: 0
}
const reductionReason = { maxAllowanceHours: 0 }
const activeStartDate = moment().subtract(30, 'days').toDate()
const activeEndDate = moment().add(30, 'days').toDate()
const testReduction = new Reduction('1', '5',
  [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
  [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'Test Note', reductionReason)
let workloadOwnerId
let addedReductionId
let inserts = []

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
