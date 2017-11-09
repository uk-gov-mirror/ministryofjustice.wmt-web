const knex = require('../../../knex').web

module.exports = function (id) {
  var table = 'team_case_details_view'
  var selectList = [
    'link_id AS linkId',
    'CONCAT(forename, \' \', surname) AS name',
    'grade_code AS grade',
    'flag AS inactiveCaseType',
    'case_ref_no AS caseRefNumber',
    'location',
    'tier_code AS tierNumber'
  ]

  var UNPAID = 'flag = \'U\''
  var WARRANT = 'flag = \'W\''
  var OVERDUE = 'flag = \'O\''
  var SUSPENDED = 'flag = \'S\''

  var whereString = 'WHERE (' + UNPAID + ' OR ' + WARRANT + ' OR ' + OVERDUE + ' OR ' + SUSPENDED + ')'

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString += ' AND (id = ' + id + ')'
  }

  var noExpandHint = ' WITH (NOEXPAND)'

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
        ' FROM ' + table +
        noExpandHint +
        whereString)
        .then(function (results) {
          return results
        })
}
