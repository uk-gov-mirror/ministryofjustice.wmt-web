const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const orgUnitConstants = require('../../constants/organisation-unit')
const workloadTypes = require('../../constants/workload-type')

module.exports = function (id, type, workloadType = workloadTypes.PROBATION) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.overviewView
  var whereClause = ''
  var selectColumns = []

  if (workloadType === workloadTypes.OMIC) {
    table = 'omic_' + table
    selectColumns = [
      'name',
      'total_cases AS totalCases',
      'total_custody_points AS custodyPoints',
      'total_licence_points AS licencePoints',
      'link_id AS linkId'
    ]
  } else {
    table = table + ' WITH (NOEXPAND)'
    selectColumns = [
      'name',
      'total_cases AS totalCases',
      'available_points AS availablePoints',
      'total_points AS totalPoints',
      'contracted_hours AS contractedHours',
      'reduction_hours AS reductionHours',
      'cms_adjustment_points as cmsAdjustmentPoints',
      'link_id AS linkId'
    ]
  }

  if (id !== undefined) {
    whereClause = ' WHERE id = ' + id
  }

  if (orgUnit.name === orgUnitConstants.TEAM.name || orgUnit.name === orgUnitConstants.OFFENDER_MANAGER.name) {
    selectColumns.push('grade_code AS gradeCode')
  }

  return knex.raw(
      'SELECT ' + selectColumns.join(', ') +
      ' FROM ' + table +
      whereClause)
    .then(function (results) {
      return results
    })
}
