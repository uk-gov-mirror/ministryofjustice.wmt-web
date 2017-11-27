const knex = require('../../../knex').archive

module.exports = function (startDate, endDate) {
  var selectColumns = [
    'unique_identifier AS uniqueIdentifier',
    'om_type_id AS omTypeId',
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
    'reduction_date AS reductionDate',
    'reduction_added_by AS reductionAddedBy'
  ]
  return knex.raw('SELECT TOP 10000 ' + selectColumns.join(', ') + ' FROM archive_data_view'
   + 'WHERE reductionDate BETWEEN ' + startDate + ' AND ' + endDate)
}
