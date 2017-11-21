const knex = require('../../../knex').archive

module.exports = function () {
  var selectColumns = [
    'unique_identifier AS uniqueIdentifier',
    'ldu_name AS lduName',
    'team_name AS teamName',
    'om_name AS omName',
    'total_cases AS totalCases',
    'total_points AS totalPoints',
    'nominal_target AS nominalTarget',
    'contracted_hours AS contractedHours',
    'hours_reduction AS hoursReduction',
    'reduction',
    'comments'
  ]
  return knex.raw('SELECT TOP 50 ' + selectColumns.join(', ') + ' FROM archive_view')
}
