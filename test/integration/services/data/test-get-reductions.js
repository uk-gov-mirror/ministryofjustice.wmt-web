const expect = require('chai').expect
const moment = require('moment')
const Reduction = require('../../../../app/services/domain/reduction')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getReductions = require('../../../../app/services/data/get-reductions')
const insertReduction = require('../../../../app/services/data/insert-reduction')

var activeStartDate = moment().subtract(30, 'days').toDate()
var activeEndDate = moment().add(30, 'days').toDate()
var reductionToInsert = new Reduction('1', '10',
  [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
  [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'Test Note')
var workloadOwnerId
var reductionReasonId
var inserts = []

var insertedReduction = {
  table: 'reductions',
  id: 0
}

describe('services/data/get-reductions', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
    .then(function (result) {
      inserts = result
      return dataHelper.getAnyExistingWorkloadOwnerId()
      .then(function (id) {
        workloadOwnerId = id
        return dataHelper.getAnyExistingReductionReasonId()
        .then(function (id) {
          reductionReasonId = id
          reductionToInsert.reasonForReductionId = reductionReasonId
          return insertReduction(workloadOwnerId, reductionToInsert)
          .then(function (result) {
            insertedReduction.id = result
          })
        })
      })
    })
  })

  it('should return a reduction record for a given workload id', function () {
    return getReductions(workloadOwnerId)
    .then(function (results) {
      expect(results[results.length - 1].id).to.eql(insertedReduction.id[0])
      expect(results[results.length - 1].workloadOwnerId).to.eql(workloadOwnerId)
    })
  })

  it('should return all reduction records when no workload ownder id is provided', function () {
    return getReductions()
    .then(function (results) {
      expect(results.length).to.greaterThan(0)
    })
  })

  after(function () {
    inserts.push(insertedReduction)
    return dataHelper.removeInsertedData(inserts)
  })
})
