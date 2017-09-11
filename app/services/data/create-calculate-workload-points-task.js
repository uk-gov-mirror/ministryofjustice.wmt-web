const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id, workloadId, workloadReportId, batchSize) {
  var newTask = {
    submitting_agent: 'WEB',
    type: 'CALCULATE-WORKLOAD-POINTS',
    additional_data: JSON.stringify({workloadBatch: {startingId: workloadId, batchSize: batchSize}}),
    workload_report_id: workloadReportId,
    date_created: undefined,
    status: 'PENDING'
  }
  return knex('tasks').returning('id').insert(newTask)
}
