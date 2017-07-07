const expect = require('chai').expect

const organisationalHierarchyHelper = require('../../../helpers/data/organisational-hierarchy-db-helper')
const getOrgansationalHierarchyData = require('../../../../app/services/data/get-organisational-hierarchy-data')

var inserts = []

describe('services/data/get-organisational-hierarchy-data', function () {
  before(function (done) {
    organisationalHierarchyHelper.addOrganisationalHierachy()
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should retrieve the organisational hierarchy', function (done) {
    getOrgansationalHierarchyData().then(function (results) {
      var expectedResults = {
        region_id: inserts[inserts.findIndex(element => element.table === 'region')].id,
        region_description: 'OH Region',
        ldu_id: inserts[inserts.findIndex(element => element.table === 'ldu')].id,
        ldu_description: 'OH LDU',
        team_id: inserts[inserts.findIndex(element => element.table === 'team')].id,
        team_description: 'OH Team',
        offender_manager_id: inserts[inserts.findIndex(element => element.table === 'offender_manager')].id,
        offender_manager_forename: 'OH Forename',
        offender_manager_surname: 'OH Surname'
      }
      expect(results).to.include(expectedResults)
      done()
    })
  })

  after(function (done) {
    organisationalHierarchyHelper.removeOrganisationalHierarchy(inserts)
      .then(() => done())
  })
})
