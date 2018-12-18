const knex = require('../../../knex').web

module.exports = function (id) {

  var selectList = [
    'tierCode',
    'rowType',
    'caseReferenceNo',
    'caseType'
  ]

  return knex('case_details_view')
    .columns(selectList)
    .where('workloadOwnerId', id)
}
