const knex = require('../../../knex').web

module.exports = function (username) {
  if (username === undefined) {
    throw new ReferenceError('Username is not defined')
  }

  return knex('users')
    .where('username', username)
    .select('id',
      'username',
      'name')
    .then(function (user) {
      return user[0]
    })
}
