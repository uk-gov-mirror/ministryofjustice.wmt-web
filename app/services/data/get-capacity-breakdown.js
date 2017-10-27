const knex = require('../../../knex').web
const orgUnitFinder = require('../helpers/org-unit-finder')
const ORGANISATION_UNIT = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)

  var table = orgUnit.capacityBreakdownView

  var selectList = [
    'total_points AS totalPoints',
    'available_points AS availablePoints',
    'reduction_hours AS reductionHours',
    'link_id AS linkId',
    'grade_code AS grade',
    'total_cases AS totalCases',
    'monthly_sdrs AS sdrs',
    'sdr_conversions_last_30_days AS sdrConversions',
    'paroms_completed_last_30_days AS paroms',
    'total_t2a_cases AS totalT2aCases',
    'cms_adjustment_points AS cmsAdjustmentPoints',
    'gs_adjustment_points AS gsAdjustmentPoints',
    'arms_total_cases AS armsTotalCases',
    'contracted_hours AS contractedHours'
  ]

  var requiresWorkloadOwnerName = (type === ORGANISATION_UNIT.TEAM.name)

  if (requiresWorkloadOwnerName) {
    selectList.push('CONCAT(forename, \' \', surname) AS name')
  } else {
    selectList.push('name')
  }

  var whereString = ''

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString += ' WHERE id = ' + id
  }

  var noExpandHint = ' WITH (NOEXPAND)'

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
      ' FROM ' + table +
      noExpandHint +
      whereString)
}
