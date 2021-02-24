const knex = require('../../../knex').web

module.exports = function (archiveDateRange, extraCriteria, archiveDataLimit) {
  if (extraCriteria !== null && extraCriteria !== undefined) {
    extraCriteria = extraCriteria.trim()
  }

  const selectColumns = [
    'workload_id AS workloadID',
    'workload_date AS workloadDate',
    'region_name AS regionName',
    'ldu_name AS lduName',
    'team_name AS teamName',
    'om_name AS omName',
    'grade_code AS grade',
    'total_cases AS totalCases',
    'total_points AS totalPoints',
    'available_points AS availablePoints',
    'contracted_hours AS contractedHours',
    'hours_reduction AS hoursReduction',
    'cms_adjustment_points AS cmsPoints',
    'gs_adjustment_points AS gsPoints',
    'arms_total_cases AS armsTotalCases',
    'paroms_points AS paromsPoints',
    'sdr_points AS sdrPoints',
    'sdr_conversion_points AS sdrConversionPoints',
    'nominal_target AS nominalTarget'
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
