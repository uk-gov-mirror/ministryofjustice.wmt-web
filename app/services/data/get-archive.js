const knex = require('../../../knex').archive

module.exports = function () {
  return knex('archive_view')
    .first(
      'unique_identifier AS uniqueIdentifier',
      'ldu_name AS lduName',
      'team_name AS teamName',
      'om_name AS omName',
      'total_cases AS totalCases',
      'total_points AS totalPoints',
      'nominal_target AS nominalTarget',
      'contracted_hours AS contractedHours',
      'hours_reduction AS hoursReduction',
      'reduction',
      'comments'
      )
    .then(function (result) {
      console.log(result)
      return result
    })
}
