const knex = require('../../../knex').web

module.exports = function () {
  var columns = [
    'code',
    'description AS name',
  ]
  return knex('ldu').columns(columns)
}
