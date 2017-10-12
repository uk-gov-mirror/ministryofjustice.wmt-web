const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.caseloadView

  var selectColumns = [
    'link_id AS linkId',
    'name',
    'grade_code AS grade',
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

  return knex(table)
    .where('id', id)
    .select(selectColumns)
    .then(function (results) {
      return results
    })
}
