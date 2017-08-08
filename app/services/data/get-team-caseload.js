const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id) {
  return knex('workload').select('id')
}
