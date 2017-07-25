const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getIndividualOverview = require('../../../../app/services/data/get-individual-overview')

var inserts = []

var overview = {
  grade: 'PO',
  teamName: 'Test Team',
  availablePoints: 10,
  totalPoints: 20,
  cases: 5,
  contractedHours: 40,
  reduction: 3
}

describe('services/data/get-individual-overview', function () {
  before(function (done) {
    dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should retrieve the overview details for a workload owner', function (done) {
    getIndividualOverview(inserts.filter((item) => item.table === 'workload_owner')[0].id)
    .then(function (results) {
      var insertedTeamId = inserts.filter((item) => item.table === 'team')[0].id
      expect(results).to.be.an('object')
      expect(results).to.eql(Object.assign({}, overview, {teamId: insertedTeamId}))
      done()
    })
  })

  after(function (done) {
    dataHelper.removeInsertedData(inserts)
      .then(() => done())
  })
})
