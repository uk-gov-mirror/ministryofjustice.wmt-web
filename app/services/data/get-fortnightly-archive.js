const knex = require('../../../knex').archive
const ArchiveDateRange = require('../domain/archive-date-range')

module.exports = function (archiveDateRange) {
  var selectColumns = [
    'start_date AS startDate',
    'end_date AS endDate',
    'ldu_name AS lduName',
    'team_name AS teamName',
    'om_name AS omName',
    'average_cases AS totalCases',
    'average_points AS totalPoints',
    'average_sdr_points AS sdrPoints',
    'average_sdr_conversion_points AS sdrConversionPoints',
    'average_paroms_points AS paromsPoints',
    'average_nominal_target AS nominalTarget',
    'average_contracted_hours AS contractedHours',
    'average_hours_reduction AS hoursReduction'
  ]

  var whereClause = ''
  if (archiveDateRange instanceof ArchiveDateRange) {
    whereClause = " WHERE start_date >= '" + archiveDateRange.archiveFromDate.toISOString().substring(0, 10) +
    "' AND end_date <='" + archiveDateRange.archiveToDate.toISOString().substring(0, 10) + "'"
  } else {
    whereClause = ''
  }

  var orderBy = ' ORDER BY start_date ASC '

  return knex.raw('SELECT top 10000 ' + selectColumns.join(', ') + ' FROM fortnightly_archive_data_view' +
   whereClause + orderBy)
}
