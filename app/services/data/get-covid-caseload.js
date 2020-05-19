const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.covidCaseloadView

  // WMT0160: add new tiers to selectList
  var selectList = [
    'link_id AS linkId',
    'grade_code AS grade',
    'total_cases AS totalCases',
    'location AS caseType',
    'untiered',
    'doorstop',
    'contactCentre',
    'phoneCall'
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

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
      ' FROM ' + table +
      noExpandHint +
      whereString)
}
