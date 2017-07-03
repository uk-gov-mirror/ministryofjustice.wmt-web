const config = require('../../../knexfile').web
const knex = require('knex')(config)

const Breadcrumb = require('../../domain/breadcrumb')
const paths = require('../../constants/paths')

module.exports = function (teamId) {
    return knex('team')
        .first('ldu_id',
                'ldu.description as ldu_name',
                'region_id',
                'region.description as region_name')
        .join('ldu', 'team.ldu_id', '=', 'ldu.id')
        .join('region', 'ldu.region_id', '=', 'region.id')
        .where('team.id', teamId)
        .then((result) => {
            return [
                new Breadcrumb(result.region_name, paths.CAPACITY_REGION + result.region_id),
                new Breadcrumb(result.ldu_name, paths.CAPACITY_REGION + result.ldu_id)
            ]
        })
}
