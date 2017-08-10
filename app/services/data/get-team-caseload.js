const config = require('../../../knexfile').web
const knex = require('knex')(config)
module.exports = function (id, type) {
  var table = "team_caseload_overview"
  var whereObject = {}
  if (id !== undefined) {
    whereObject.id = id
  }

  return knex(table)
    .where(whereObject)
    .select('name',
            'gradeCode',
            'untiered',
            'd2',
            'd1',
            'c2',
            'c1',
            'b2',
            'b1',
            'a',
            'totalCases')
    .then(function (results) {
      return results
    })
}
