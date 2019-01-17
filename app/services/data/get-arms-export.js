const knex = require('../../../knex').web
const log = require('../../logger')

module.exports = function (id, type) {
  var table = 'arms_export_view'
  var selectList = [
    'regionName',
    'lduName',
    'teamName',
    'assessmentDate',
    'CRN',
    'omName',
    'grade_code AS omGrade',
    'sentencetype',    
    'releaseDate'
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
