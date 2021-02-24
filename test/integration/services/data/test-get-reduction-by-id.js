const expect = require('chai').expect
const moment = require('moment')
const getReductionById = require('../../../../app/services/data/get-reduction-by-id')
const insertReduction = require('../../../../app/services/data/insert-reduction')
const Reduction = require('../../../../app/services/domain/reduction')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')

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
