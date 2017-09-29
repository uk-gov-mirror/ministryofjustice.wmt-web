const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (username) {
  return knex('users')
    .insert({
      username: username
    })
    .returning('id').then(function (ids) {
      return ids[0]
    })
}
