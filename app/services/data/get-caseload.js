const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')

module.exports = function (id, type, getNationalCaseload = false) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.caseloadView

  var selectList = [
    'link_id AS linkId',
    'grade_code AS grade',
    'region_name AS regionName',
    'total_cases AS totalCases',
    'location AS caseType',
    'untiered',
    'd2',
    'd1',
    'c2',
    'c1',
    'b2',
    'b1',
    'a'
  ]

  var requiresWorkloadOwnerName = (type === ORGANISATION_UNIT.TEAM.name)

  var whereString = ''

  if (requiresWorkloadOwnerName) {
    selectList.push('CONCAT(forename, \' \', surname) AS name')
  } else {
    selectList.push('name')
  }

  var displayAllRecords = (type === ORGANISATION_UNIT.NATIONAL.name)

  if (!displayAllRecords) {
    if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
      whereString += ' WHERE id = ' + id
    }
  }

  var noExpandHint = ' WITH (NOEXPAND)'

  if (getNationalCaseload) {
    whereString = ''
  }

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
      ' FROM ' + table +
      noExpandHint +
      whereString)
}
