const knex = require('../../../knex').archive
const archiveDataLimit = require('../../../config').ARCHIVE_DATA_LIMIT

module.exports = function (archiveDateRange, extraCriteria) {
  if (extraCriteria !== null && extraCriteria !== undefined) {
    extraCriteria = extraCriteria.trim()
  }

  const selectColumns = [
    'om_name AS omName',
    'hours_reduced AS hoursReduced',
    'comments',
    'last_updated_date AS lastUpdatedDate',
    'reduction_added_by AS reductionAddedBy'
  ]

  if (extraCriteria !== null && extraCriteria !== undefined && extraCriteria !== '') {
    return knex('archive_reduction_data')
      .limit(parseInt(archiveDataLimit))
      .select(selectColumns)
      .whereBetween('last_updated_date', [archiveDateRange.archiveFromDate.toISOString().substring(0, 10),
        archiveDateRange.archiveToDate.toISOString().substring(0, 10)])
      .andWhere(function () {
        this.where('om_name', 'like', '%' + extraCriteria + '%')
          .orWhere('reduction_added_by', 'like', '%' + extraCriteria + '%')
      })
      .orderBy('last_updated_date', 'ASC')
  } else {
    return knex('archive_reduction_data')
      .limit(parseInt(archiveDataLimit))
      .select(selectColumns)
      .whereBetween('last_updated_date', [archiveDateRange.archiveFromDate.toISOString().substring(0, 10),
        archiveDateRange.archiveToDate.toISOString().substring(0, 10)])
      .orderBy('last_updated_date', 'ASC')
  }
}
