const expect = require('chai').expect

const dataHelper = require('../../../helpers/data/aggregated-data-helper')
const getWorkloadReportsForOrg = require('../../../../app/services/data/get-workload-reports-for-org')

var inserts = []

describe('services/data/get-workload-reports-for-org', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve all workload_owners workloads within a team', function () {
    return getWorkloadReportsForOrg(inserts.filter((item) => item.table === 'team')[0].id, 'offender-manager')
      .then(function (woWorkloads) {
        expect(woWorkloads[0].total_points).to.be.a('Number')
        expect(woWorkloads[0].reduction_hours).to.be.a('Number')
        expect(woWorkloads[0].linkId).to.be.a('Number')
        expect(woWorkloads[0].name).to.be.a('String')
        expect(woWorkloads[0].totalCases).to.be.a('Number')
        expect(woWorkloads[0].cmsReductionHours).to.be.a('Number')
        expect(woWorkloads[0].contractedHours).to.be.a('Number')
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
