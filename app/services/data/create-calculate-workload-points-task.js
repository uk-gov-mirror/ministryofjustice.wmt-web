const config = require('../../../knexfile').web
const knex = require('knex')(config)
const getLatestWorkloadReportId = require('./get-latest-workload-report-id')

module.exports = function (id) {
  // TODO: Get workload report id based on OM id
  // TODO: Create new task for calculating workload points using workloadReportId
  return knex
}
