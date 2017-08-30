const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id) {
  return knex('workload')
    .where('', id)
    .select('workload_report.id')
    .then(function (result) {
      return result.id
    })
}
