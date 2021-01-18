const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getIndividualOverview = require('../../../../app/services/data/get-individual-overview')

let inserts = []

const overview = {
  grade: 'PO',
  teamName: 'Test Team',
  lduCluster: 'Test LDU',
  regionName: 'Test Region',
  cmsAdjustmentPoints: 0,
  availablePoints: 25,
  totalPoints: 50,
  cases: 8,
  contractedHours: 37.5,
  reduction: 3
}

describe('services/data/get-individual-overview', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve the overview details for a workload owner', function () {
    return getIndividualOverview(inserts.filter((item) => item.table === 'workload_owner')[0].id)
      .then(function (results) {
        const insertedTeamId = inserts.filter((item) => item.table === 'team')[0].id
        expect(results).to.be.an('object')
        expect(results).to.eql(Object.assign({}, overview, { teamId: insertedTeamId }))
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
