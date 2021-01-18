const knex = require('../../../knex').web

module.exports = function (id, type) {
  const table = 'contact_cms_export_view AS contactCMS'
  const selectList = [
    'contactRegionName',
    'contactLduName',
    'contactTeamName',
    'contactDate',
    'omContactDate',
    'contactName',
    'contactGradeCode',
    'omRegionName',
    'omLduName',
    'omTeamName',
    'contactCMS.contactId',
    'omName',
    'omGradeCode',
    'contactCMS.contactDescription',
    'contactCMS.contactCode',
    'contactCMS.contactPoints',
    'omCMS.omPoints',
    'contactCMS.caseRefNo',
    'omCMS.caseRefNo AS omCaseRefNo',
    'omCMS.contactDescription AS omContactDescription',
    'omCMS.contactCode AS omContactCode'
  ]

  const table2 = 'om_cms_export_view AS omCMS'

  let whereString

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString = ' WHERE ' + 'om' + type + 'id = ' + id +
          ' OR ' + 'contact' + type + 'id = ' + id
  }

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
      ' FROM ' + table +
      ' FULL OUTER JOIN ' + table2 + ' ON contactCMS.contactId = omCMS.contactId' +
        whereString)
    .then(function (results) {
      results.forEach(function (result) {
        if (!result.caseRefNo) {
          result.caseRefNo = result.omCaseRefNo
        }
        if (!result.contactDescription) {
          result.contactDescription = result.omContactDescription
        }
        if (!result.contactCode) {
          result.contactCode = result.omContactCode
        }
        if (!result.contactDate) {
          result.contactDate = result.omContactDate
        }
      })
      return results
    })
}
