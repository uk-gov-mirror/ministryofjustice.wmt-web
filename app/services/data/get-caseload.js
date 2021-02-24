const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  const orgUnit = orgUnitFinder('name', type)
  const table = orgUnit.caseloadView

  // WMT0160: add new tiers to selectList
  const selectList = [
    'link_id AS linkId',
    'grade_code AS grade',
    'total_cases AS totalCases',
    'location AS caseType',
    'untiered',
    'g',
    'f',
    'e',
    'd2',
    'd1',
    'c2',
    'c1',
    'b2',
    'b1',
    'a'
  ]

  const requiresWorkloadOwnerName = (type === ORGANISATION_UNIT.TEAM.name)

  let whereString = ''

  if (requiresWorkloadOwnerName) {
    selectList.push('CONCAT(forename, \' \', surname) AS name')
  } else {
    selectList.push('name')
  }

  const displayAllRecords = (type === ORGANISATION_UNIT.NATIONAL.name)

  if (!displayAllRecords) {
    if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
      whereString += ' WHERE id = ' + id
    }
  }

  const noExpandHint = ' WITH (NOEXPAND)'

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
      ' FROM ' + table +
      noExpandHint +
      whereString)
}
