const knex = require('../../../knex').archive
const ArchiveDateRange = require('../domain/archive-date-range')

module.exports = function (archiveDateRange) {
  var selectColumns = [
    'om_name AS omName',
    'hours_reduced AS hoursReduced',
    'comments',
    'last_updated_date AS lastUpdatedDate',
    'reduction_added_by AS reductionAddedBy'
  ]

  var whereClause = ''

  if (archiveDateRange instanceof ArchiveDateRange) {
    whereClause = " WHERE last_updated_date BETWEEN '" + archiveDateRange.archiveFromDate.toISOString() +
    "' AND '" + archiveDateRange.archiveToDate.toISOString().substring(0, 10) + "'"
  } else {
    whereClause = ''
  }

  var orderBy = ' ORDER BY last_updated_date ASC '

  return knex.raw('SELECT ' + selectColumns.join(', ') + ' FROM archive_reductions_view' +
   whereClause + orderBy)
}
