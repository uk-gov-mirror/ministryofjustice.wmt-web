const knex = require('../../../knex').web

module.exports = function (id, hours) {
  return knex('workload_owner').where('id', id)
    .update({ contracted_hours: hours })
}
