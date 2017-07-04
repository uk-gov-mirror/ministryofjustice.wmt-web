const config = require('../../../knexfile').web
const knex = require('knex')(config)

const Breadcrumb = require('../../domain/breadcrumb')
const paths = require('../../constants/paths')

module.exports = function (lduId) {
  return knex('ldu')
        .first('region_id',
               'region.description as region_name')
        .join('region', 'ldu.region_id', '=', 'region.id')
        .where('ldu.id', lduId)
        .then((result) => {
          return [new Breadcrumb(result.region_name, paths.CAPACITY_REGION + result.region_id)]
        })
}
