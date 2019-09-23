const knex = require('../../../knex').web

module.exports = function (id, type) {
  if (type === 'hmpps') {
    type = 'region'
  }
  var table = type + '_reductions_statistics'
  var columns = [
    'reduction_reason AS reductionReason',
    'count'
  ]
  if (id) {
    return knex(table)
      .columns(columns)
      .where(type + '_id', id)
  } else {
    return knex(table)
      .columns(columns)
  }
}
