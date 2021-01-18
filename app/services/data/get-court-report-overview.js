const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  const orgUnit = orgUnitFinder('name', type)
  const table = orgUnit.courtReporterOverview

  let whereString = ''

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString += ' WHERE id = ' + id
  }

  const selectList = [
    'link_id AS linkId',
    'contracted_hours AS contractedHours',
    'reduction_hours AS reduction',
    'total_sdrs AS totalSdrs',
    'total_fdrs AS totalFdrs',
    'total_oral_reports AS totalOralReports'
  ]

  if (ORGANISATION_UNIT.NATIONAL.name !== orgUnit.name) {
    selectList.push('id')
  }

  if (ORGANISATION_UNIT.OFFENDER_MANAGER.name === type) {
    selectList.push('name')
    selectList.push('grade_code AS grade')
  } else if (ORGANISATION_UNIT.TEAM.name === type) {
    selectList.push('CONCAT(forename, \' \', surname) AS name')
    selectList.push('grade_code AS grade')
  } else {
    selectList.push('name')
  }

  const noExpandHint = ' WITH (NOEXPAND)'

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
      ' FROM ' + table +
      noExpandHint +
      whereString)
}
