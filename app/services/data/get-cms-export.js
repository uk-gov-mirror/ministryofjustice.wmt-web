const knex = require('../../../knex').web

module.exports = function (id, type) {
  var table = 'contact_cms_export_view AS contactCMS'
  var selectList = [
    'contactRegionName',
    'contactLduName',
    'contactTeamName',
    'contactDate',
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
    'omCMS.omPoints'
  ]

  var table2 = 'om_cms_export_view AS omCMS'

  var whereString

  if (id !== undefined && (!isNaN(parseInt(id, 10)))) {
    whereString = ' WHERE ' + 'om' + type + 'id = ' + id +
          ' OR ' + 'contact' + type + 'id = ' + id
  }

  return knex.schema.raw('SELECT ' + selectList.join(', ') +
      ' FROM ' + table +
      ' JOIN ' + table2 + ' ON contactCMS.contactId = omCMS.contactId' +
        whereString)
      .then(function (results) {
        return {results: results}
      })
}
