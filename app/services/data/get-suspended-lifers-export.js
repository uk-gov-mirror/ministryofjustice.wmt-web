const knex = require('../../../knex').web

module.exports = function (id, type) {
  var table = 'suspended_lifers_export_view'
  var selectList = [
    'regionName',
    'lduName',
    'teamName',
    'tierCode',
    'rowType',
    'caseReferenceNo',
    'caseType',
    'offenderManagerName',
    'gradeCode',
    'inCustody',
    'registerLevel',
    'registerCategory',
    'registerCategoryDescription',
    'registrationDate'
  ]

  var whereString

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString = ' WHERE ' + type + 'id = ' + id
  }

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
        ' FROM ' + table +
        whereString)
    .then(function (results) {
      if (results.length > 0) {
        results.forEach(function (result) {
          if (result.inCustody === 'N') {
            result.inCustody = 'No'
          } else if (result.inCustody === 'Y') {
            result.inCustody = 'Yes'
          }
          if (result.registrationDate) {
            var newDate = new Date(result.registrationDate)
            var year = newDate.getFullYear()
            var month = newDate.getMonth() + 1
            var dt = newDate.getDate()
            if (month < 10) {
              month = '0' + month
            }
            result.registrationDate = dt + '/' + month + '/' + year
          }
        })
      }
      return results
    })
}
