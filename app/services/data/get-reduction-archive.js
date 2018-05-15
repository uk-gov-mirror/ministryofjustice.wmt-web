const knex = require('../../../knex').archive

module.exports = function (archiveDateRange, extraCriteria) {
  if (extraCriteria !== null && extraCriteria !== undefined) {
    extraCriteria = extraCriteria.trim()
  }

  var selectColumns = [
    'om_name AS omName',
    'hours_reduced AS hoursReduced',
    'comments',
    'last_updated_date AS lastUpdatedDate',
    'reduction_added_by AS reductionAddedBy'
  ]

  if (extraCriteria !== null && extraCriteria !== undefined && extraCriteria !== '') {
    console.log(knex('archive_reductions_view')
    .select(selectColumns)
    .whereBetween('last_updated_date', [archiveDateRange.archiveFromDate.toISOString().substring(0, 10),
      archiveDateRange.archiveToDate.toISOString().substring(0, 10)])
    .andWhere(function () {
      this.where('om_name', 'like', '%' + extraCriteria + '%')
      .orWhere('reduction_added_by', 'like', '%' + extraCriteria + '%')
    })
    .orderBy('last_updated_date', 'ASC').toString())
  } else {
    console.log(knex('archive_reductions_view')
    .select(selectColumns)
    .whereBetween('last_updated_date', [archiveDateRange.archiveFromDate.toISOString().substring(0, 10),
      archiveDateRange.archiveToDate.toISOString().substring(0, 10)])
    .orderBy('last_updated_date', 'ASC').toString())
  }

  if (extraCriteria !== null && extraCriteria !== undefined && extraCriteria !== '') {
    return knex('archive_reductions_view')
    .select(selectColumns)
    .whereBetween('last_updated_date', [archiveDateRange.archiveFromDate.toISOString().substring(0, 10),
      archiveDateRange.archiveToDate.toISOString().substring(0, 10)])
    .andWhere(function () {
      this.where('om_name', 'like', '%' + extraCriteria + '%')
      .orWhere('reduction_added_by', 'like', '%' + extraCriteria + '%')
    })
    .orderBy('last_updated_date', 'ASC')
  } else {
    return knex('archive_reductions_view')
    .select(selectColumns)
    .whereBetween('last_updated_date', [archiveDateRange.archiveFromDate.toISOString().substring(0, 10),
      archiveDateRange.archiveToDate.toISOString().substring(0, 10)])
    .orderBy('last_updated_date', 'ASC')
  }
}
