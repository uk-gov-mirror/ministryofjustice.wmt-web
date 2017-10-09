const expect = require('chai').expect

const getIdsForWpRecalc = require('../../../../app/services/data/get-ids-for-workload-points-recalc')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')

var previousWpId
var inserts = []

var expectedWorkloadReportId
var expectedMinWorkloadStagingId
var expectedMaxWorkloadStagingId

describe('/services/data/get-ids-for-workload-points-recalc', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
    .then(function (builtInserts) {
      inserts = builtInserts
      previousWpId = inserts.filter((item) => item.table === 'workload_points')[0].id
      expectedWorkloadReportId = inserts.filter((item) => item.table === 'workload_report')[1].id
      expectedMinWorkloadStagingId = dataHelper.maxStagingId + 1
      expectedMaxWorkloadStagingId = dataHelper.maxStagingId + 2
    })
  })

  it('should return the correct min and max workload ids and workload report id', function () {
    return getIdsForWpRecalc(previousWpId)
      .then(function (result) {
        expect(result.minWorkloadStagingId).to.eql(expectedMinWorkloadStagingId)
        expect(result.maxWorkloadStagingId).to.eql(expectedMaxWorkloadStagingId)
        expect(result.workloadReportId).to.eql(expectedWorkloadReportId)
      })
  })

  after(function () {
    return dataHelper.removeInsertedData(inserts)
  })
})
