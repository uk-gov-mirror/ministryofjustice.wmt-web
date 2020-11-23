const knex = require('../../../knex').web

module.exports = function (id, type) {
  const table = 'gs_export_view'
  const selectList = [
    'regionName',
    'lduName',
    'teamName',
    'contactDate',
    'contactId',
    'caseRefNo',
    'omName',
    'omGradeCode',
    'contact_description AS contactDescription',
    'contactCode',
    'points'
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
