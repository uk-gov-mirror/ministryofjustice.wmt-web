const knex = require('../../../knex').web

module.exports = function () {
  return knex('tasks')
    .where('type', 'CREATE-COURT-REPORTS').andWhere('status', 'COMPLETE')
    .select('date_processed')
}
