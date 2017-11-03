const knex = require('../../../knex').archive

module.exports = function () {
  return knex('archive_view')
    .first(
      'ldu_name',
      'team_name',
      'om_name',
      'reduction'
      )
    .then(function (result) {
      console.log(result)
      return result
    })
}
