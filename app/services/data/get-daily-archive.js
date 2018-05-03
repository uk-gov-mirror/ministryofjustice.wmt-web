const knex = require('../../../knex').archive
const ArchiveDateRange = require('../domain/archive-date-range')

module.exports = function (archiveDateRange) {
  var selectColumns = [
    'workload_id AS workloadID',
    'workload_date AS workloadDate',
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
    'hours_reduction AS hoursReduction'
  ]

  var whereClause
  if (archiveDateRange instanceof ArchiveDateRange) {
    whereClause = " WHERE workload_date BETWEEN '" + archiveDateRange.archiveFromDate.toISOString().substring(0, 10) +
    "' AND '" + archiveDateRange.archiveToDate.toISOString().substring(0, 10) + "'"
  } else {
    whereClause = ''
  }

  var orderBy = ' ORDER BY workload_id ASC '

  return knex.raw('SELECT top 10000 ' + selectColumns.join(', ') + ' FROM archive_data_view' +
   whereClause + orderBy)
}
