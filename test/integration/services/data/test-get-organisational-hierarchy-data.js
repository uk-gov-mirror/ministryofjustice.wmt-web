const expect = require('chai').expect

const organisationalHierarchyHelper = require('../../../helpers/data/organisational-hierarchy-db-helper')
const getOrgansationalHierarchyData = require('../../../../app/services/data/get-organisational-hierarchy-data')

let inserts = []

describe('services/data/get-organisational-hierarchy-data', function () {
  before(function () {
    return organisationalHierarchyHelper.addOrganisationalHierachy()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve the organisational hierarchy', function () {
    return getOrgansationalHierarchyData().then(function (results) {
      const expectedResults = {
        region_id: inserts[inserts.findIndex(element => element.table === 'region')].id,
        region_description: 'OH Region',
        ldu_id: inserts[inserts.findIndex(element => element.table === 'ldu')].id,
        ldu_description: 'OH LDU',
        team_id: inserts[inserts.findIndex(element => element.table === 'team')].id,
        team_description: 'OH Team',
        workload_owner_id: inserts[inserts.findIndex(element => element.table === 'workload_owner')].id,
        offender_manager_forename: 'OH Forename',
        offender_manager_surname: 'OH Surname'
      }
      expect(results).to.deep.include(expectedResults)
    })
  })

  after(function () {
    return organisationalHierarchyHelper.removeOrganisationalHierarchy(inserts)
  })
})
