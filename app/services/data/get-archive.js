const knex = require('../../../knex').archive
const ArchiveDateRange = require('../domain/archive-date-range')

module.exports = function (archiveDateRange) {
  var selectColumns = [
    'unique_identifier AS uniqueIdentifier',
    'om_type_id AS omTypeId',
    'workload_ldu_id AS lduName',
    'team_name AS teamName',
    'om_surname AS omName',
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
  if(archiveDateRange instanceof ArchiveDateRange) {
    whereClause = ' WHERE reduction_date BETWEEN ' + archiveDateRange.archiveFromDate.toISOString().substring(0, 10)
    + ' AND ' + archiveDateRange.archiveToDate.toISOString().substring(0, 10)
  } else {
    whereClause = ''
  }

  return knex.raw('SELECT TOP 10000 ' + selectColumns.join(', ') + ' FROM offender_managers_archive_view'
   + whereClause)
}
