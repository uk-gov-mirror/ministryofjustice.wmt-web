const expect = require('chai').expect
const moment = require('moment')
const insertReduction = require('../../../../app/services/data/insert-reduction')
const Reduction = require('../../../../app/services/domain/reduction')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const updateReduction = require('../../../../app/services/data/update-reduction')

var reductionResult = {
  table: 'reductions',
  id: 0
}

var activeStartDate = moment().subtract(30, 'days').toDate()
var activeEndDate = moment().add(30, 'days').toDate()
var testReduction = new Reduction('1', '5',
  [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
  [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'Test Note')
const updatedReductionNote = 'New test note'
var workloadOwnerId
var addedReductionId
var inserts = []

describe('/services/data/update-reduction', function () {
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

  it('should update a reduction and return an id ', function () {
    var updatedReduction = Object.assign({}, testReduction)
    updatedReduction.notes = updatedReductionNote

    return updateReduction(addedReductionId, workloadOwnerId, updatedReduction)
      .then(function (result) {
        // Store the id so that we can delete it after the test is complete
        reductionResult.id = result
        expect(result[0]).to.be.a('number')
        expect(result).to.eql(addedReductionId)
      })
  })

  after(function () {
    inserts.push(reductionResult)
    return dataHelper.removeInsertedData(inserts)
  })
})
