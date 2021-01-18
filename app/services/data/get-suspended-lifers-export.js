const knex = require('../../../knex').web

module.exports = function (id, type) {
  const table = 'suspended_lifers_export_view'
  const selectList = [
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

  let whereString

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
            const newDate = new Date(result.registrationDate)
            const year = newDate.getFullYear()
            let month = newDate.getMonth() + 1
            const dt = newDate.getDate()
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
