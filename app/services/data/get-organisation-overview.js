const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const orgUnitConstants = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.overviewView
  var whereClause = ''
  var params = []

  if (id !== undefined) {
    whereClause = ' WHERE id = ? '
    params.push(id)
  }

  var selectColumns = [
    'name',
    'total_cases AS totalCases',
    'available_points AS availablePoints',
    'total_points AS totalPoints',
    'contracted_hours AS contractedHours',
    'reduction_hours AS reductionHours',
    'link_id AS linkId']

  if (orgUnit.name === orgUnitConstants.TEAM.name || orgUnit.name === orgUnitConstants.OFFENDER_MANAGER.name) {
    selectColumns.push('grade_code AS gradeCode')
  }

  return knex.raw('SELECT ' + selectColumns.join(', ') +
           ' FROM ' + table + whereClause +
           ' WITH(NOEXPAND)', params)
    .then(function (results) {
      return results
    })
}
