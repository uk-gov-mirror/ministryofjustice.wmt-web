const config = require('../../../knexfile').web
const knex = require('knex')(config)
const getLatestWorkloadReportId = require('./get-latest-workload-and-workload-report-id')

module.exports = function (id) {
  return getLatestWorkloadReportId(id)
    .then(function (result) {
      var newTask = {
        submitting_agent: 'WEB',
        type: 'CALCULATE_WORKLOAD_POINTS',
        additional_data: JSON.stringify({startingId: result.workloadId, batchSize: 1}),
        workload_report_id: result.workloadReportId,
        date_created: undefined,
        status: 'PENDING'
      }
      return knex('tasks').returning('id').insert(newTask)
    })
}
