const knex = require('../../../knex').web
const log = require('../../logger')

module.exports = function (id, type) {
  var table = 'gs_export_view'
  var selectList = [
    'regionName',
    'lduName',
    'teamName',
    'contactDate',
    'CRN',
    'omName',
    'omGradeCode',
    'contact_description AS contactDescription'
  ]
    
  var whereString 
    
  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString = ' WHERE ' + type + 'id = ' + id 
  }
    
  return knex.schema.raw('SELECT ' + selectList.join(', ') +
        ' FROM ' + table +
        whereString)
      .then(function (results) {
          log.info(results.length)
          return results
        })
}
