const expect = require('chai').expect

const createCalculateWorkloadPointsTask = require('../../../../app/services/data/create-calculate-workload-points-task')
const dataHelper = require('../../../helpers/data/aggregated-data-helper')

var inserts = []

var insertedTask = {
  table: 'tasks',
  id: 0
}

var workloadId = 1
var workloadReportId
var batchSize = 3
var task

describe('/services/data/create-calculate-workload-points-task', function () {
  before(function () {
    return dataHelper.addWorkloadCapacitiesForOffenderManager()
      .then(function (result) {
        inserts = result
        return dataHelper.getAnyExistingWorkloadReportId()
          .then(function (id) {
            workloadReportId = id
            task = {
              submitting_agent: 'WEB',
              type: 'CALCULATE-WORKLOAD-POINTS',
              additional_data: JSON.stringify({
                workloadBatch: { startingId: workloadId, batchSize: batchSize },
                operationType: 'UPDATE'
              }),
              workload_report_id: workloadReportId,
              status: 'PENDING'
            }
          })
      })
  })

  it('should create a task and insert it in the task table', function () {
    return createCalculateWorkloadPointsTask(workloadId, workloadReportId, batchSize)
      .then(function (result) {
        insertedTask.id = result
        expect(result[0]).to.be.a('number')
        return dataHelper.getAllTasks().then(function (allTasks) {
          expect(allTasks).to.contain(task)
        })
      })
  })

  after(function () {
    inserts.push(insertedTask)
    return dataHelper.removeInsertedData(inserts)
  })
})
