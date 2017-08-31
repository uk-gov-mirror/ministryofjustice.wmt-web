const config = require('../../../knexfile').integrationTests
const knex = require('knex')(config)
var Promise = require('bluebird').Promise

var baseReductionReasonsRow = {
  reason: 'Test Reason 1',
  reason_short_name: '1',
  allowance_percentage: 20,
  max_allowance_percentage: null,
  months_to_expiry: 6
}

module.exports.addReductionsRefData = function () {
  var inserts = []
  var reductionCategories = [
    { category: 'Test Category 1' },
    { category: 'Test Category 2' }
  ]

  return knex('reduction_category').returning('id').insert(reductionCategories)
  .then(function (ids) {
    ids.forEach((id) => {
      inserts.push({table: 'reduction_category', id: id})
    })
    var reductionReasons = [
      Object.assign({}, baseReductionReasonsRow, { category_id: ids[0] }),
      Object.assign({}, baseReductionReasonsRow, { category_id: ids[0], reason: 'Test Reason 2', reason_short_name: '2' }),
      Object.assign({}, baseReductionReasonsRow, { category_id: ids[1] }),
      Object.assign({}, baseReductionReasonsRow, { category_id: ids[1], reason: 'Test Reason 2', reason_short_name: '2' })
    ]
    return knex('reduction_reason').returning('id').insert(reductionReasons)
  })
  .then(function (ids) {
    ids.forEach((id) => {
      inserts.push({table: 'reduction_reason', id: id})
    })
    return inserts
  })
}

module.exports.removeInsertedData = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}
