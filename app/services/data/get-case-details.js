const knex = require('../../../knex').web

module.exports = function (id) {
  var selectList = [
    'tierCode',
    'rowType',
    'caseReferenceNo',
    'caseType',
    'inCustody',
    'registerLevel',
    'registerCategory',
    'registerCategoryDescription',
    'registrationDate'
  ]

  return knex('case_details_view')
    .columns(selectList)
    .where('workloadOwnerId', id)
    .then(function (results) {
      if (results.length > 0) {
        results.forEach(function (result) {
          formatSuspendedLiferFields(result)
        })
      }
      return results
    })
}

var formatSuspendedLiferFields = function (result) {
  if (result.rowType !== 'Suspended Lifer') {
    result.inCustody = 'N/A'
    result.registerLevel = 'N/A'
    result.registerCategory = 'N/A'
    result.registerCategoryDescription = 'N/A'
    result.registrationDate = 'N/A'
  } else {
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
  }
}
