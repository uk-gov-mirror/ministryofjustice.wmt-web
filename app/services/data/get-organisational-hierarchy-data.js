const knex = require('../../../knex').web

module.exports = function () {
  return knex('workload_owner')
    .join('offender_manager', 'workload_owner.offender_manager_id', '=', 'offender_manager.id')
    .join('team', 'workload_owner.team_id', '=', 'team.id')
    .join('ldu', 'team.ldu_id', '=', 'ldu.id')
    .join('region', 'ldu.region_id', '=', 'region.id')
    .select('region.id AS region_id',
      'region.description AS region_description',
      'ldu.id AS ldu_id',
      'ldu.description AS ldu_description',
      'team.id AS team_id',
      'team.description AS team_description',
      'workload_owner.id AS workload_owner_id',
      'offender_manager.forename AS offender_manager_forename',
      'offender_manager.surname AS offender_manager_surname')
}
