const knex = require('../../../knex').archive
const archiveDataLimit = require('../../../config').ARCHIVE_DATA_LIMIT

module.exports = function (archiveDateRange, extraCriteria) {
  if (extraCriteria !== null && extraCriteria !== undefined) {
    extraCriteria = extraCriteria.trim()
  }

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

  if (extraCriteria !== null && extraCriteria !== undefined && extraCriteria !== '') {
    return knex('fortnightly_archive_data_view')
    .limit(parseInt(archiveDataLimit))
    .select(selectColumns)
    .where('start_date', '>=', archiveDateRange.archiveFromDate.toISOString().substring(0, 10))
    .andWhere('end_date', '<=', archiveDateRange.archiveToDate.toISOString().substring(0, 10))
    .andWhere(function () {
      this.where('team_name', 'like', '%' + extraCriteria + '%')
      .orWhere('ldu_name', 'like', '%' + extraCriteria + '%')
      .orWhere('om_name', 'like', '%' + extraCriteria + '%')
    })
    .orderBy('start_date', 'ASC')
  } else {
    return knex('fortnightly_archive_data_view')
    .limit(parseInt(archiveDataLimit))
    .select(selectColumns)
    .where('start_date', '>=', archiveDateRange.archiveFromDate.toISOString().substring(0, 10))
    .andWhere('end_date', '<=', archiveDateRange.archiveToDate.toISOString().substring(0, 10))
    .orderBy('start_date', 'ASC')
  }
}
