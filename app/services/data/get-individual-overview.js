const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id) {
  return knex('individual_case_overview')
    .first('grade_code AS grade',
           'team_id AS teamId',
           'team_name AS teamName',
           'available_points AS availablePoints',
           'total_points AS totalPoints',
           'total_cases AS cases',
           'contracted_hours AS contractedHours',
           'reduction_hours AS reduction',
           'default_contracted_hours_po AS defaultContractedHoursPo',
           'default_contracted_hours_pso AS defaultContractedHoursPso')
    .where('workload_owner_id', id)
}
