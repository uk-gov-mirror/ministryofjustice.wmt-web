const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (workloadOwnerId) {
  return knex('workload_owner')
        .first('team_id',
                'team.description as team_name',
                'ldu_id',
                'ldu.description as ldu_name',
                'region_id',
                'region.description as region_name')
        .join('team', 'workload_owner.team_id', '=', 'team.id')
        .join('ldu', 'team.ldu_id', '=', 'ldu.id')
        .join('region', 'ldu.region_id', '=', 'region.id')
        .where('workload_owner.id', workloadOwnerId)
        .then((result) => {
          return {
            region: {id: result.region_id, name: result.region_name},
            ldu: {id: result.ldu_id, name: result.ldu_name},
            team: {id: result.team_id, name: result.team_name}
          }
        })
}
