const config = require('../../../knexfile').web
const knex = require('knex')(config)
const orgUnitFinder = require('../helpers/org-unit-finder')
const orgUnits = require('../../constants/organisation-unit')

module.exports = function(id, type) {
  var orgUnit = orgUnitFinder('name', type)
  var table = orgUnit.courtReporterOverview
  var whereObject = {}
  if (id !== undefined) {
    whereObject.id = id
  }

  // possibly add org name
  var selectColumns = [
    'id',
    'grade_code AS grade',
    'link_id AS linkId',
    'name AS name',
    'contracted_hours AS contractedHours',
    'reduction_hours AS reduction',
    'total_cases_sdrs AS totalCasesSdrs',
    'total_cases_fdrs AS totalCasesFdrs',
    'total_cases_oral_reports AS totalCasesOralReports' 
  ]
  
  return knex(table)
  .where(whereObject)    
  .select(selectColumns)
}