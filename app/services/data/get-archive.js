const knex = require('../../../knex').archive
const ArchiveDateRange = require('../domain/archive-date-range')

module.exports = function (archiveDateRange) {
  var selectColumns = [
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

  var whereClause
  if(archiveDateRange instanceof ArchiveDateRange) {
    whereClause = ' WHERE reduction_date BETWEEN ' + archiveDateRange.archiveFromDate.toISOString().substring(0, 10)
    + ' AND ' + archiveDateRange.archiveToDate.toISOString().substring(0, 10)
  } else {
    whereClause = ''
  }

  return knex.raw('SELECT top 100 ' + selectColumns.join(', ') + ' FROM archive_data_view'
   + whereClause)
}
