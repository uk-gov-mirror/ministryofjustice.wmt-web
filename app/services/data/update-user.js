const knex = require('../../../knex').web

module.exports = function (userId, name) {
  return knex('users')
    .where('id', userId)
    .update({
      name: name
    })
}
