const expect = require('chai').expect

const getlatestStagingIdAndWorkloadReportId = require('../../../../app/services/data/get-latest-court-reports-staging-id-and-workload-report-id')
const crDataHelper = require('../../../helpers/data/court-reports-aggregated-data-helper')

let inserts = []

let workloadOwnerId
let workloadReportId

describe('/services/data/get-latest-court-reports-staging-id-and-workload-report-id', function () {
  before(function () {
    return crDataHelper.addCourtReportWorkloadsForOffenderManager()
      .then(function (result) {
        inserts = result
        workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
        workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
      })
  })

  it('should create a task and insert it in the task table', function () {
    return getlatestStagingIdAndWorkloadReportId(workloadOwnerId)
      .then(function (results) {
        expect(results.workloadReportId).to.be.eql(workloadReportId)
        expect(results.courtReportsStagingId).to.be.a('Number')
      })
  })

  after(function () {
    return crDataHelper.removeInsertedData(inserts)
  })
})
