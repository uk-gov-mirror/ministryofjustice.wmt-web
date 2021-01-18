const knex = require('../../../knex').archive
const archiveDataLimit = require('../../../config').ARCHIVE_DATA_LIMIT

module.exports = function (archiveDateRange, extraCriteria) {
  if (extraCriteria !== null && extraCriteria !== undefined) {
    extraCriteria = extraCriteria.trim()
  }

  const selectColumns = [
    'workload_id AS workloadID',
    'workload_date AS workloadDate',
    'ldu_name AS lduName',
    'region_name AS regionName',
    'grade AS grade',
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

  if (extraCriteria !== null && extraCriteria !== undefined && extraCriteria !== '') {
    return knex('daily_archive_data')
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
    return knex('daily_archive_data')
      .limit(parseInt(archiveDataLimit))
      .select(selectColumns)
      .whereBetween('workload_date', [archiveDateRange.archiveFromDate.toISOString().substring(0, 10),
        archiveDateRange.archiveToDate.toISOString().substring(0, 10)])
      .orderBy('workload_id', 'ASC')
  }
}
