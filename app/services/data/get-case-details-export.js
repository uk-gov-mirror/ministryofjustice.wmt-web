const knex = require('../../../knex').web

module.exports = function (id, type) {
  const table = 'case_details_export_view'
  const selectList = [
    'regionName',
    'lduName',
    'teamName',
    'tierCode',
    'rowType',
    'caseReferenceNo',
    'caseType',
    'offenderManagerName',
    'gradeCode'
  ]

  let whereString

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString = ' WHERE ' + type + 'id = ' + id
  }

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
        ' FROM ' + table +
        whereString)
    .then(function (results) {
      return results
    })
}
