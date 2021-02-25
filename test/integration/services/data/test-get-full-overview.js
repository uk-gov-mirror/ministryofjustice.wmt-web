const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getOrganisationOverview = require('../../../../app/services/data/get-full-overview')
const orgUnitConstants = require('../../../../app/constants/organisation-unit')

let inserts = []

const expectedResult = [{
  lduCluster: 'Test LDU',
  teamName: 'Test Team',
  offenderManager: 'Test_Forename Test_Surname',
  totalCases: 8,
  availablePoints: 25,
  totalPoints: 50,
  contractedHours: 37.5,
  reductionHours: 3,
  gradeCode: 'PO'

}]

describe('services/data/get-full-overview', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (buildInserts) {
        inserts = buildInserts
      })
  })

  it('should return all offender manager caseload data for region ', function () {
    expectedResult[0].regionName = 'Test Region'
    return getOrganisationOverview(inserts.filter((item) => item.table === 'region')[0].id, orgUnitConstants.REGION.name)
      .then(function (results) {
        expect(results[0].regionName).to.eql(expectedResult[0].regionName)
        expect(results[0].lduCluster).to.eql(expectedResult[0].lduCluster)
        expect(results[0].teamName).to.eql(expectedResult[0].teamName)
        expect(results[0].offenderManager).to.eql(expectedResult[0].offenderManager)
        expect(results[0].totalCases).to.eql(expectedResult[0].totalCases)
        expect(results[0].availablePoints).to.eql(expectedResult[0].availablePoints)
        expect(results[0].contractedHours).to.eql(expectedResult[0].contractedHours)
        expect(results[0].reductionHours).to.eql(expectedResult[0].reductionHours)
        expect(results[0].gradeCode).to.eql(expectedResult[0].gradeCode)
      })
  })

  it('should return all offender manager caseload data for a Probation Delivery Unit', function () {
    return getOrganisationOverview(inserts.filter((item) => item.table === 'ldu')[0].id, orgUnitConstants.LDU.name)
      .then(function (results) {
        expect(results[0].lduCluster).to.eql(expectedResult[0].lduCluster)
        expect(results[0].teamName).to.eql(expectedResult[0].teamName)
        expect(results[0].offenderManager).to.eql(expectedResult[0].offenderManager)
        expect(results[0].totalCases).to.eql(expectedResult[0].totalCases)
        expect(results[0].availablePoints).to.eql(expectedResult[0].availablePoints)
        expect(results[0].contractedHours).to.eql(expectedResult[0].contractedHours)
        expect(results[0].reductionHours).to.eql(expectedResult[0].reductionHours)
        expect(results[0].gradeCode).to.eql(expectedResult[0].gradeCode)
      })
  })

  it('should return all offender manager caseload data for a team ', function () {
    return getOrganisationOverview(inserts.filter((item) => item.table === 'team')[0].id, orgUnitConstants.TEAM.name)
      .then(function (results) {
        expect(results[0].lduCluster).to.eql(expectedResult[0].lduCluster)
        expect(results[0].teamName).to.eql(expectedResult[0].teamName)
        expect(results[0].offenderManager).to.eql(expectedResult[0].offenderManager)
        expect(results[0].totalCases).to.eql(expectedResult[0].totalCases)
        expect(results[0].availablePoints).to.eql(expectedResult[0].availablePoints)
        expect(results[0].contractedHours).to.eql(expectedResult[0].contractedHours)
        expect(results[0].reductionHours).to.eql(expectedResult[0].reductionHours)
        expect(results[0].gradeCode).to.eql(expectedResult[0].gradeCode)
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
