const config = require('../../../config')
const knexConfig = require('../../../knexfile').web
const knex = require('knex')(knexConfig)
const dateFormatter = require('../date-formatter')

module.exports = function (fileId) {
  const NUMBER_OF_DASHBOARD_FILES = parseInt(config.NUMBER_OF_DASHBOARD_FILES)
  const DASHBOARD = 'DASHBOARD'

  const whereString = {
    file_type: DASHBOARD,
    is_enabled: true
  }

  if (fileId) {
    whereString.id = fileId
  }

  const columns = [
    'id',
    'file_type',
    'date_created',
    'filepath',
    'is_enabled'
  ]

  return knex('export_file')
    .columns(columns)
    .where(whereString)
    .orderBy('date_created', 'desc')
    .limit(NUMBER_OF_DASHBOARD_FILES)
    .then(function (results) {
      if (results) {
        if (results.length > 0) {
          results.forEach(function (result) {
            result.date_created = dateFormatter.formatDate(result.date_created, 'DD-MM-YYYY HH:mm')
          })
        }
      }
      return results
    })
}
