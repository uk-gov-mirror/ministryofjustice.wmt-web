const knex = require('../../../knex').web

module.exports = function () {
  return knex('tasks')
    .first('date_processed')
    .where('type', 'PROCESS-IMPORT')
    .andWhere('status', 'COMPLETE')
    .orderBy('id', 'desc')
    .then(function (result) {
      return result
    })
}
