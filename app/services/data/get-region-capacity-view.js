const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function () {
  return knex.schema
    .raw('SELECT * from app.region_capacity_view;')
}
