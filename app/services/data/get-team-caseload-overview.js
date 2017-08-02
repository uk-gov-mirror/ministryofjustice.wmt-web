const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id) {
  return knex('app.team_case_overview')
    .select('name',
            'grade_code AS gradeCode',
            'total_cases AS totalCases',
            'available_points AS availablePoints',
            'total_points AS totalPoints',
            'contracted_hours AS contractedHours',
            'reduction_hours AS reductionHours',
            'person_id AS personId')
    .where('team_id', id)
    .then(function (results) {
      return results
    })
}
