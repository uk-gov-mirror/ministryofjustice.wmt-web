const config = require('../../../knexfile').web
const knex = require('knex')(config)
module.exports = function (id) {
  var table = 'team_caseload_view'

  return knex(table)
    .where('id', id)
    .select('name',
            'grade_code AS gradeCode',
            'untiered',
            'd2',
            'd1',
            'c2',
            'c1',
            'b2',
            'b1',
            'a',
            'total_cases AS totalCases',
            'link_id AS linkId')
    .then(function (results) {
      return results
    })
}
