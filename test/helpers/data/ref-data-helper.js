const knex = require('../../knex').integrationTests
const Promise = require('bluebird').Promise

module.exports.addReductionsRefData = function (maxId) {
  const inserts = []
  const reductionCategories = [
    { category: 'Test Category 1' },
    { category: 'Test Category 2' }
  ]

  return knex('reduction_category').returning('id').insert(reductionCategories)
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'reduction_category', id: id })
      })
      const tableName = 'reduction_reason'
      const insertStatement = 'INSERT INTO app.' + tableName + ' (id, reason, reason_short_name, category_id, allowance_percentage, max_allowance_percentage, months_to_expiry) VALUES '
      const sql = 'SET IDENTITY_INSERT app.' + tableName + ' ON;' +
      insertStatement + '(' + (maxId + 1) + ',\'Test Reason 1\',1,' + ids[0] + ',20,null,6)'
      return knex.raw(sql).then(function () {
        inserts.push({ table: 'reduction_reason', id: (maxId + 1) })
        return inserts
      })
    })
}

module.exports.removeInsertedData = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}

module.exports.getMaxReductionReasonId = function () {
  return knex('reduction_reason')
    .max('id AS maxId')
    .then(function (maxId) {
      return maxId[0].maxId
    })
}
