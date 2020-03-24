const knex = require('../../../knex').web

module.exports = function () {
  var columns = [
    'code',
    'description as name',
  ]
  return knex('team').columns(columns)
}
