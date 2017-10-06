const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (username, name) {
  return knex('users')
    .insert({
      username: username,
      name: name
    })
    .returning('id').then(function (ids) {
      return ids[0]
    })
}
