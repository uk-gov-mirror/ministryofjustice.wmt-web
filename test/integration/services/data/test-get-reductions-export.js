const expect = require('chai').expect
const moment = require('moment')
const getReductionsExport = require('../../../../app/services/data/get-reduction-notes-export')
const orgUnitConstants = require('../../../../app/constants/organisation-unit')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const Reduction = require('../../../../app/services/domain/reduction')
const insertReduction = require('../../../../app/services/data/insert-reduction')

var inserts = []
var reductionReason = { maxAllowanceHours: 0 }
var activeStartDate = moment().subtract(30, 'days').toDate()
var activeEndDate = moment().add(30, 'days').toDate()
var testReductionInsert = new Reduction('1', '5',
    [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
    [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'New Test Note', reductionReason)
var workloadOwnerId

var testExpectedResult = {
  offenderManager: 'Test_Forename Test_Surname',
  reason: 'Disability',
  amount: 5,
  status: 'ACTIVE',
  additionalNotes: 'New Test Note'
}

var reductionResult = {
  table: 'reductions',
  id: 0
}

describe('services/data/get-reduction-notes-export', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
            .then(function (result) {
              inserts = result
              workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
              return dataHelper.getAnyExistingReductionReasonId()
                    .then(function (id) {
                      testReductionInsert.reasonForReductionId = id
                      return insertReduction(workloadOwnerId, testReductionInsert)
                            .then(function (reductionId) {
                              reductionResult.id = reductionId
                              inserts.push(reductionResult)
                            })
                    })
            })
  })

  it('should return inserted test reduction at team level', function () {
    return getReductionsExport(inserts.filter((item) => item.table === 'team')[0].id, orgUnitConstants.TEAM.name)
        .then(function (results) {
          expect(results[0].offenderManager).to.eql(testExpectedResult.offenderManager)
          expect(results[0].reason).to.eql(testExpectedResult.reason)
          expect(results[0].status).to.eql(testExpectedResult.status)
          expect(results[0].additionalNotes).to.eql(testExpectedResult.additionalNotes)
        })
  })

  it('should return inserted test reduction at ldu level', function () {
    return getReductionsExport(inserts.filter((item) => item.table === 'ldu')[0].id, orgUnitConstants.LDU.name)
        .then(function (results) {
          expect(results[0].offenderManager).to.eql(testExpectedResult.offenderManager)
          expect(results[0].reason).to.eql(testExpectedResult.reason)
          expect(results[0].status).to.eql(testExpectedResult.status)
          expect(results[0].additionalNotes).to.eql(testExpectedResult.additionalNotes)
        })
  })

  it('should return inserted test reduction at region level', function () {
    return getReductionsExport(inserts.filter((item) => item.table === 'region')[0].id, orgUnitConstants.REGION.name)
        .then(function (results) {
          expect(results[0].offenderManager).to.eql(testExpectedResult.offenderManager)
          expect(results[0].reason).to.eql(testExpectedResult.reason)
          expect(results[0].status).to.eql(testExpectedResult.status)
          expect(results[0].additionalNotes).to.eql(testExpectedResult.additionalNotes)
        })
  })

  it('should return an empty list when team does not exist', function () {
    return dataHelper.generateNonExistantTeamId()
        .then(function (id) {
          return getReductionsExport(id, orgUnitConstants.TEAM.name)
            .then(function (results) {
                expect(results).to.be.empty //eslint-disable-line
            })
        })
  })

  it('should return an empty list when ldu does not exist', function () {
    return dataHelper.generateNonExistantLduId()
        .then(function (id) {
          return getReductionsExport(id, orgUnitConstants.LDU.name)
            .then(function (results) {
                expect(results).to.be.empty //eslint-disable-line
            })
        })
  })

  it('should return an empty list when region does not exist', function () {
    return dataHelper.generateNonExistantRegionId()
        .then(function (id) {
          return getReductionsExport(id, orgUnitConstants.REGION.name)
            .then(function (results) {
                expect(results).to.be.empty //eslint-disable-line
            })
        })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
