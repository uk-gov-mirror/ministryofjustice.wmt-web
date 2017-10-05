const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id) {
  if (id === undefined) {
    throw new ReferenceError('User id is not defined')
  }

  return knex('users')
    .where('id', id)
    .select('username',
            'name')
    .then(function (user) {
      return user[0]
    })
}
