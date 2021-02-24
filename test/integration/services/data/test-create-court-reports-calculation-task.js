const expect = require('chai').expect

const createCalculateWorkloadPointsTask = require('../../../../app/services/data/create-court-reports-calculation-task')
const crDataHelper = require('../../../helpers/data/court-reports-aggregated-data-helper')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')

let inserts = []

const insertedTask = {
  table: 'tasks',
  id: 0
}

const workloadId = 1
let workloadReportId
const batchSize = 3
let task

describe('/services/data/test-court-reports-calculation-task', function () {
  before(function () {
    return crDataHelper.addCourtReportWorkloadsForOffenderManager()
      .then(function (result) {
        inserts = result
        workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

        task = {
          submitting_agent: 'WEB',
          type: 'COURT-REPORTS-CALCULATION',
          additional_data: JSON.stringify({
            workloadBatch: { startingId: workloadId, batchSize: batchSize },
            operationType: 'UPDATE'
          }),
          workload_report_id: workloadReportId,
          status: 'PENDING'
        }
      })
  })

  it('should create a task and insert it in the task table', function () {
    return createCalculateWorkloadPointsTask(workloadId, workloadReportId, batchSize)
      .then(function (result) {
        insertedTask.id = result
        expect(result[0]).to.be.a('number')
        return dataHelper.getAllTasks().then(function (allTasks) {
          expect(allTasks).to.deep.contain(task)
        })
      })
  })

  after(function () {
    inserts.push(insertedTask)
    return dataHelper.removeInsertedData(inserts)
  })
})
