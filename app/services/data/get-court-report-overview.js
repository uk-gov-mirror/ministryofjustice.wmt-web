const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.courtReporterOverview

  var whereString = ''

  var selectList = [
    'link_id AS linkId',
    'contracted_hours AS contractedHours',
    'reduction_hours AS reduction',
    'total_sdrs AS totalSdrs',
    'total_fdrs AS totalFdrs',
    'total_oral_reports AS totalOralReports'
  ]

  if (ORGANISATION_UNIT.NATIONAL.name !== orgUnit) {
    selectList.push('id')
    whereString = ' WHERE id = ' + id
  }

  if (ORGANISATION_UNIT.TEAM.name === type) {
    selectList.push('CONCAT(forename, \' \', surname) AS name')
    selectList.push('grade_code AS grade')
  } else {
    selectList.push('name')
  }

  var noExpandHint = ' WITH (NOEXPAND)'

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
      ' FROM ' + table +
      noExpandHint +
      whereString)
}
