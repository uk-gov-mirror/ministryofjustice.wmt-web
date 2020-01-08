const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const orgUnitConstants = require('../../constants/organisation-unit')

module.exports = function (id, type, workloadType) {
  var orgUnit = orgUnitFinder('name', type)
  var table = 'individual_case_overview'
  var whereClause = ''
  var orderBy = 'lduCluster, teamName'

  if (id !== undefined) {
    whereClause = 'WHERE ' + orgUnit.name + '_id = ' + id
  }

  if (workloadType === 'omic') {
    table = 'omic_' + table
  }

  var selectColumns = [
    'ldu_name AS lduCluster',
    'team_name AS teamName',
    'of_name AS offenderManager',
    'total_cases AS totalCases',
    'available_points AS availablePoints',
    'total_points AS totalPoints',
    'contracted_hours AS contractedHours',
    'reduction_hours AS reductionHours',
    'cms_adjustment_points as cmsAdjustmentPoints',
    'grade_code AS gradeCode'
  ]

  if (orgUnit.name === orgUnitConstants.REGION.name || orgUnit.name === orgUnitConstants.NATIONAL.name) {
    selectColumns.unshift('region_name AS regionName')
    orderBy = 'regionName,' + orderBy
  }

  return knex.raw(
        'SELECT ' + selectColumns.join(', ') +
        ' FROM ' + table + ' WITH (NOEXPAND)' +
        whereClause + ' ORDER BY ' + orderBy)
    .then(function (results) {
      return results
    })
}
