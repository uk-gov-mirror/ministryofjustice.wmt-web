const knex = require('../../../knex').web

module.exports = function (id) {
  const table = 'team_case_details_view'
  const selectList = [
    'link_id AS linkId',
    'team_description AS teamDescription',
    'ldu_description AS lduDescription',
    'link_id AS linkId',
    'CONCAT(forename, \' \', surname) AS name',
    'grade_code AS grade',
    'flag AS inactiveCaseType',
    'case_ref_no AS caseRefNumber',
    'location',
    'tier_code AS tierNumber'
  ]

  const UNPAID = 'flag = \'U\''
  const WARRANT = 'flag = \'W\''
  const OVERDUE = 'flag = \'O\''
  const SUSPENDED = 'flag = \'S\''

  let whereString = 'WHERE (' + UNPAID + ' OR ' + WARRANT + ' OR ' + OVERDUE + ' OR ' + SUSPENDED + ')'

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString += ' AND (id = ' + id + ')'
  }

  const noExpandHint = ' WITH (NOEXPAND)'

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
        ' FROM ' + table +
        noExpandHint +
        whereString)
    .then(function (results) {
      return results
    })
}
