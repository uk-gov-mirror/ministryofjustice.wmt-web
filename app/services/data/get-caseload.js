const config = require('../../../knexfile').web
const knex = require('knex')(config)
const orgUnitConstants = require('../../constants/organisation-unit')
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.caseloadView

  var selectColumns = [
    'link_id AS linkId',
    'name',
    'untiered',
    'd2',
    'd1',
    'c2',
    'c1',
    'b2',
    'b1',
    'a',
    'total_cases AS totalCases',
    'case_type AS caseType'
  ]

  if (orgUnit.name === orgUnitConstants.TEAM.name) {
    selectColumns.push('grade_code AS gradeCode')
  }

  return knex(table)
    .where('id', id)
    .select(selectColumns)
    .then(function (results) {
      return results
    })
}
