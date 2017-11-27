const knex = require('../../../knex').archive

module.exports = function () {
  var selectColumns = [
    'unique_identifier AS uniqueIdentifier',
    'ldu_name AS lduName',
    'team_name AS teamName',
    'om_name AS omName',
    'total_cases AS totalCases',
    'total_points AS totalPoints',
    'sdr_points AS sdrPoints',
    'sdr_conversion_points AS sdrConversionPoints',
    'paroms_points AS paromsPoints',
    'nominal_target AS nominalTarget',
    'contracted_hours AS contractedHours',
    'hours_reduction AS hoursReduction',
    'reduction',
    'comments',
    'om_type_id AS omTypeId'
  ]
  return knex.raw('SELECT TOP 10000 ' + selectColumns.join(', ') + ' FROM archive_data_view')
}
