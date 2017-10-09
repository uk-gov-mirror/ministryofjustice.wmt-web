const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (workloadStagingId, workloadReportId, batchSize) {
  var newTask = {
    submitting_agent: 'WEB',
    type: 'CALCULATE-WORKLOAD-POINTS',
    additional_data: JSON.stringify(
      {
        workloadBatch: { startingId: workloadStagingId, batchSize: batchSize },
        operationType: 'UPDATE'
      }),
    workload_report_id: workloadReportId,
    date_created: undefined,
    status: 'PENDING'
  }
  return knex('tasks').returning('id').insert(newTask)
}
