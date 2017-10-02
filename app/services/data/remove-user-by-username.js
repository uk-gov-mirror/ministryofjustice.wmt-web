const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (username) {
  if (username === undefined) {
    throw new ReferenceError('Username is not defined')
  }

  return knex('users')
        .where('username', username)
        .del()
        .then(function (count) {
          return count
        })
}
