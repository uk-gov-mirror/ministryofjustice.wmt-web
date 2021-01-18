const knex = require('../../../knex').web

module.exports = function (workloadStagingId, workloadReportId, batchSize) {
  const newTask = {
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
