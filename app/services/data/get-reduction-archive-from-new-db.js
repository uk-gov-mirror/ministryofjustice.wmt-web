const knex = require('../../../knex').web
const archiveDataLimit = require('../../../config').ARCHIVE_DATA_LIMIT

module.exports = function (archiveDateRange, extraCriteria) {
  if (extraCriteria !== null && extraCriteria !== undefined) {
    extraCriteria = extraCriteria.trim()
  }

  var selectColumns = [
    'reduction_id AS reductionId',
    'om_name AS omName',
    'hours_reduced AS hoursReduced',
    'comments',
    'last_updated_date AS lastUpdatedDate',
    'reduction_added_by AS reductionAddedBy',
    'reduction_reason AS reductionReason',
    'start_date AS startDate',
    'end_date AS endDate',
    'reduction_status AS reductionStatus'
  ]

  if (extraCriteria !== null && extraCriteria !== undefined && extraCriteria !== '') {
    return knex('reductions_archive_view')
      .limit(parseInt(archiveDataLimit))
      .select(selectColumns)
      .whereBetween('end_date', [archiveDateRange.archiveFromDate.toISOString().substring(0, 10),
        archiveDateRange.archiveToDate.toISOString().substring(0, 10)])
      .andWhere(function () {
        this.where('om_name', 'like', '%' + extraCriteria + '%')
          .orWhere('reduction_added_by', 'like', '%' + extraCriteria + '%')
      })
      .orderBy('last_updated_date', 'ASC')
  } else {
    return knex('reductions_archive_view')
      .limit(parseInt(archiveDataLimit))
      .select(selectColumns)
      .whereBetween('end_date', [archiveDateRange.archiveFromDate.toISOString().substring(0, 10),
        archiveDateRange.archiveToDate.toISOString().substring(0, 10)])
      .orderBy('last_updated_date', 'ASC')
  }
}
