const knex = require('../../../knex').web

module.exports = function () {
  var columns = [
    'forename',
    'surname',
    'key'
  ]
  return knex('offender_manager').columns(columns)
    .then(function (results) {
      results.forEach(function (result) {
        result.name = result.forename + result.surname
      })
      return results
    })
}
