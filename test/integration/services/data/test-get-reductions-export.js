const expect = require('chai').expect
const moment = require('moment')
const getReductionsExport = require('../../../../app/services/data/get-reduction-notes-export')
const orgUnitConstants = require('../../../../app/constants/organisation-unit')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const Reduction = require('../../../../app/services/domain/reduction')
const insertReduction = require('../../../../app/services/data/insert-reduction')

var inserts = []

  
  var reductionReason = 'Disability'
  var activeStartDate = moment().subtract(30, 'days').toDate()
  var activeEndDate = moment().add(30, 'days').toDate()
  var testReduction = new Reduction('1', '5',
    [activeStartDate.getDate(), activeStartDate.getMonth() + 1, activeStartDate.getFullYear()],
    [activeEndDate.getDate(), activeEndDate.getMonth() + 1, activeEndDate.getFullYear()], 'Test Note', reductionReason)
  var workloadOwnerId
  var addedReductionId

  var reductionResult = {
    name: 'Test Offender Manager',
    reason: reductionReason,
    amount: 5,
    startDate: activeStartDate,
    endDate: activeEndDate,
    status: 'Active',
    additionalNotes: 'Test Note'
  }

describe('services/data/get-reduction-notes-export', function() {
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
                      //console.log(inserts)
                      //console.log((inserts.filter((item) => item.table === 'region')[0].id))
                    })
                })
            })
        })
    })
    
    it('should return all reductions at region level', function() {
        //console.log('Result: ', getReductionsExport(50, orgUnitConstants.REGION.name))
        return getReductionsExport(inserts.filter((item) => item.table === 'region')[0].id, orgUnitConstants.REGION.name)
        .then(function (results) {
            console.log(results)
            // Store the id so that we can delete it after the test is complete
            reductionResult.id = results.id
            expect(results).to.eql(Object.assign({}, testReduction))
        })
    })
    /** 
    it('should return all reductions at ldu level', function() {
        console.log('Result: ', getReductionsExport(inserts.filter((item) => item.table === 'ldu')[0].id, orgUnitConstants.LDU.name))
        return getReductionsExport(inserts.filter((item) => item.table === 'ldu')[0].id, orgUnitConstants.LDU.name)
        .then(function (results) {
            console.log(results)
            // Store the id so that we can delete it after the test is complete
            reductionResult.id = results.id
            expect(results).to.eql(Object.assign({}, testReduction))
        })
    }) 

    it('should return all reductions at team level', function() {
        console.log('Result: ', getReductionsExport(inserts.filter((item) => item.table === 'team')[0].id, orgUnitConstants.TEAM.name))
        return getReductionsExport(inserts.filter((item) => item.table === 'team')[0].id, orgUnitConstants.TEAM.name)
        .then(function (results) {
            console.log(results)
            // Store the id so that we can delete it after the test is complete
            reductionResult.id = results.id
            expect(results).to.eql(Object.assign({}, testReduction))
        })
    }) 
    */

    it('should return an empty list when team does not exist', function () {
        return getReductionsExport(9999999, orgUnitConstants.TEAM.name)
        .then(function (results) {
          expect(results).to.be.empty //eslint-disable-line
        })
    })
    
    it('should return an empty list when ldu does not exist', function () {
        return getReductionsExport(9999999, orgUnitConstants.LDU.name)
        .then(function (results) {
          expect(results).to.be.empty //eslint-disable-line
        })
    })
    
    it('should return an empty list when region does not exist', function () {
        return getReductionsExport(9999999, orgUnitConstants.REGION.name)
        .then(function (results) {
          expect(results).to.be.empty //eslint-disable-line
        })
    })

    after(function () {
        return dataHelper.removeInsertedData(inserts)
    })
})