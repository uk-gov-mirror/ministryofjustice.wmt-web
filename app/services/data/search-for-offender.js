const knex = require('../../../knex').web

module.exports = function (surname) {
  var columns = [
    'forename',
    'surname',
    'team',
    'ldu',
    'region'
  ]
  return knex('offender_manager_search_view').columns(columns).where('surname', surname)
}
