const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (userId) {
  if (userId === undefined) {
    throw new ReferenceError('User id is not defined')
  }

  return knex('user_role')
    .where('user_id', userId)
    .del()
    .then(function (count) {
      return count
    })
}
