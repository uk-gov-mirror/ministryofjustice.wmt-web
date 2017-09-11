const config = require('../../../knexfile').web
const knex = require('knex')(config)
const orgUnitFinder = require('../helpers/org-unit-finder')
const orgUnitConstants = require('../../constants/organisation-unit')

module.exports = function (id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.overviewView
  var whereObject = {}
  if (id !== undefined) {
    whereObject.id = id
  }

  var selectColumns = [
    'name',
    'total_cases AS totalCases',
    'available_points AS availablePoints',
    'total_points AS totalPoints',
    'contracted_hours AS contractedHours',
    'reduction_hours AS reductionHours',
    'default_contracted_hours_po AS defaultContractedHoursPo',
    'default_contracted_hours_pso AS defaultContractedHoursPso',
    'link_id AS linkId']

  if (orgUnit.name === orgUnitConstants.TEAM.name || orgUnit.name === orgUnitConstants.OFFENDER_MANAGER.name) {
    selectColumns.push('grade_code AS gradeCode')
  }

  return knex(table)
    .where(whereObject)
    .select(selectColumns)
    .then(function (results) {
      return results
    })
}
