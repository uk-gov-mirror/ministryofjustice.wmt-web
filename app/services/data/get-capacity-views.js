const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (type) {
  var sql = 'SELECT * from app.' + type
  return knex.schema
    .raw(sql)
}
