const config = require('../../../knexfile').web
const knex = require('knex')(config)
const getLatestWorkloadReportId = require('./get-latest-workload-and-workload-report-id')

module.exports = function (id, batchSize) {
  return getLatestWorkloadReportId(id)
    .then(function (result) {
      var newTask = {
        submitting_agent: 'WEB',
        type: 'CALCULATE-WORKLOAD-POINTS',
        additional_data: JSON.stringify({workloadBatch: {startingId: result.workloadId, batchSize: batchSize}}),
        workload_report_id: result.workloadReportId,
        date_created: undefined,
        status: 'PENDING'
      }
      return knex('tasks').returning('id').insert(newTask)
    })
}
