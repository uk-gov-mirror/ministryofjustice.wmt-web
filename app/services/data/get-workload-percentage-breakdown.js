const knex = require('../../../knex').web
const percentageCalculator = require('../helpers/percentage-calculator')
// const log = require('../../logger')

module.exports = function (id, organisationLevel) {
  const columns = [
    'region_name AS regionName',
    'ldu_name AS lduName',
    'team_name AS teamName',
    'om_name AS omName',
    'grade_code AS omGrade',
    'total_case_points AS totalCasePoints',
    'arms_community_points AS armsCommunityPoints',
    'arms_licence_points AS armsLicencePoints',
    'cms_adjustment_points AS cmsPoints',
    'gs_adjustment_points AS gsPoints',
    'paroms_points AS paromsPoints',
    'sdr_points AS sdrPoints',
    'sdr_conversion_points AS sdrConversionPoints',
    'available_points AS availablePoints',
    'total_points_overall AS totalPointsOverall',
    'contracted_hours AS contractedHours',
    'reduction_hours AS reductionHours'
  ]

  return knex('workload_percentage_breakdown_view')
    .columns(columns)
    .where(organisationLevel + '_id', id)
    .then(function (results) {
      if (results) {
        results.forEach(function (result) {
          result.capacity = percentageCalculator.calculatePercentage(result.totalPointsOverall, result.availablePoints).toFixed(1) + '%'
          result.cmsContribution = percentageCalculator.calculatePercentage(result.cmsPoints, result.availablePoints).toFixed(1) + '%'
          result.gsContribution = percentageCalculator.calculatePercentage(result.gsPoints, result.availablePoints).toFixed(1) + '%'
          result.caseContribution = percentageCalculator.calculatePercentage(result.totalCasePoints, result.availablePoints).toFixed(1) + '%'
          result.armsContribution = percentageCalculator.calculatePercentage(result.armsCommunityPoints + result.armsLicencePoints, result.availablePoints).toFixed(1) + '%'
          result.paromsContribution = percentageCalculator.calculatePercentage(result.paromsPoints, result.availablePoints).toFixed(1) + '%'
          result.sdrContribution = percentageCalculator.calculatePercentage(result.sdrPoints, result.availablePoints).toFixed(1) + '%'
          result.fdrContribution = percentageCalculator.calculatePercentage(result.sdrConversionPoints, result.availablePoints).toFixed(1) + '%'
        })
      }
      return results
    })
}
