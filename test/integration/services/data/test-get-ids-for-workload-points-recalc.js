const expect = require('chai').expect

const getIdsForWpRecalc = require('../../../../app/services/data/get-ids-for-workload-points-recalc')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')

let previousWpId
let previousT2aWpId
let inserts = []

let expectedWorkloadReportId
let expectedMinWorkloadStagingId
let expectedMaxWorkloadStagingId

describe('/services/data/get-ids-for-workload-points-recalc', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (builtInserts) {
        return dataHelper.addPoOffenderManager(builtInserts)
          .then(function (insertsWithTwoWo) {
            inserts = insertsWithTwoWo
            previousWpId = inserts.filter((item) => item.table === 'workload_points')[0].id
            previousT2aWpId = inserts.filter((item) => item.table === 'workload_points')[2].id
            expectedWorkloadReportId = inserts.filter((item) => item.table === 'workload_report')[1].id
            expectedMinWorkloadStagingId = dataHelper.maxStagingId
            expectedMaxWorkloadStagingId = dataHelper.maxStagingId + 2
          })
      })
  })

  it('should return the correct min and max workload ids and workload report id', function () {
    return getIdsForWpRecalc(previousWpId, false)
      .then(function (result) {
        expect(result.minWorkloadStagingId).to.eql(expectedMinWorkloadStagingId)
        expect(result.maxWorkloadStagingId).to.eql(expectedMaxWorkloadStagingId)
        expect(result.workloadReportId).to.eql(expectedWorkloadReportId)
      })
  })

  it('should return the correct min and max workload ids and workload report id for t2a workload points', function () {
    return getIdsForWpRecalc(previousT2aWpId, true)
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
