const expect = require('chai').expect

const workloadCapacityHelper = require('../../../helpers/data/aggregated-data-helper')
const getOrganisationOverview = require('../../../../app/services/data/get-organisation-overview')
const orgUnitConstants = require('../../../../app/constants/organisation-unit')

let inserts = []

describe('services/data/get-organisation-overview', function () {
  before(function () {
    return workloadCapacityHelper.addCaseProgressDataForAllOrgUnits()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve all members for a given team', function () {
    return getOrganisationOverview(inserts.filter((item) => item.table === 'team')[0].id, orgUnitConstants.TEAM.name)
      .then(function (results) {
        expect(results.length).to.equal(2)
        expect(results[0].name).to.equal('Test_Forename Test_Surname')
        expect(results[1].name).to.equal('Test_Forename Test_Surname')
      })
  })

  it('should retrieve all members for a given ldu', function () {
    return getOrganisationOverview(inserts.filter((item) => item.table === 'ldu')[0].id, orgUnitConstants.LDU.name)
      .then(function (results) {
        expect(results.map(function (entry) {
          return entry.name
        }))
          .to.contain('Test Team')
      })
  })

  it('should retrieve all members for a given region', function () {
    return getOrganisationOverview(inserts.filter((item) => item.table === 'region')[0].id, orgUnitConstants.REGION.name)
      .then(function (results) {
        expect(results.map(function (entry) {
          return entry.name
        }))
          .to.contain('Test LDU')
      })
  })

  it('should retrieve all member for national', function () {
    return getOrganisationOverview(undefined, orgUnitConstants.NATIONAL.name)
      .then(function (results) {
        expect(results.map(function (entry) {
          return entry.name
        })).to.contain('Test Region')
      })
  })

  it('should return an empty list when team does not exist', function () {
    return workloadCapacityHelper.generateNonExistantTeamId()
      .then(function (invalidId) {
        return getOrganisationOverview(invalidId, orgUnitConstants.TEAM.name)
          .then(function (results) {
        expect(results).to.be.empty //eslint-disable-line
          })
      })
  })

  it('should return an empty list when ldu does not exist', function () {
    return workloadCapacityHelper.generateNonExistantLduId()
      .then(function (invalidId) {
        return getOrganisationOverview(invalidId, orgUnitConstants.LDU.name)
          .then(function (results) {
        expect(results).to.be.empty //eslint-disable-line
          })
      })
  })

  it('should return an empty list when region does not exist', function () {
    return workloadCapacityHelper.generateNonExistantRegionId()
      .then(function (invalidId) {
        return getOrganisationOverview(invalidId, orgUnitConstants.REGION.name)
          .then(function (results) {
        expect(results).to.be.empty //eslint-disable-line
          })
      })
  })

  after(function () {
    return workloadCapacityHelper.removeInsertedData(inserts)
  })
})
