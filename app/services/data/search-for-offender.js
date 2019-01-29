const knex = require('../../../knex').web
const log = require('../../logger')

module.exports = function (surname) {
  var columns = [
    'forename',
    'surname',
    'team',
    'ldu',
    'region'
  ]
  log.info(knex('offender_manager_search_view').columns(columns).where('surname', surname).toString())
  return knex('offender_manager_search_view').columns(columns).where('surname', surname)
}
