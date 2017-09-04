const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id, hours) {
  return knex('workload_owner').where('id', id)
.update({'contracted_hours': hours})
}
