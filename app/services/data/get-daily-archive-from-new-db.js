const knex = require('../../../knex').web
const archiveDataLimit = require('../../../config').ARCHIVE_DATA_LIMIT

module.exports = function (archiveDateRange, extraCriteria) {
  if (extraCriteria !== null && extraCriteria !== undefined) {
    extraCriteria = extraCriteria.trim()
  }

  var selectColumns = [
    'workload_id AS workloadID',
    'workload_date AS workloadDate',
    'ldu_name AS lduName',
    'team_name AS teamName',
    'om_name AS omName',
    'total_cases AS totalCases',
    'total_points AS totalPoints',
    'available_points AS availablePoints',
    'contracted_hours AS contractedHours',
    'hours_reduction AS hoursReduction'
  ]

  if (extraCriteria !== null && extraCriteria !== undefined && extraCriteria !== '') {
    return knex('team_archive_data')
    .limit(parseInt(archiveDataLimit))
    .select(selectColumns)
    .whereBetween('workload_date', [archiveDateRange.archiveFromDate.toISOString().substring(0, 10),
      archiveDateRange.archiveToDate.toISOString().substring(0, 10)])
    .andWhere(function () {
      this.where('team_name', 'like', '%' + extraCriteria + '%')
      .orWhere('ldu_name', 'like', '%' + extraCriteria + '%')
      .orWhere('om_name', 'like', '%' + extraCriteria + '%')
    })
    .orderBy('workload_id', 'ASC')
  } else {
    return knex('team_archive_data')
    .limit(parseInt(archiveDataLimit))
    .select(selectColumns)
    .whereBetween('workload_date', [archiveDateRange.archiveFromDate.toISOString().substring(0, 10),
      archiveDateRange.archiveToDate.toISOString().substring(0, 10)])
    .orderBy('workload_id', 'ASC')
  }
}
