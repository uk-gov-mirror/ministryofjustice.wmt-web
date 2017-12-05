const knex = require('../../../knex').web

module.exports = function () {
  return knex('tasks')
    .where('type', 'CREATE-WORKLOAD').andWhere('status', 'COMPLETE')
    .select('date_processed')
}