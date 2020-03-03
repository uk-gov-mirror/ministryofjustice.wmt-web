const knex = require('../../../knex').web

module.exports = function (name) {
  if (name === undefined) {
    throw new ReferenceError('Team Name is not defined')
  }

  return knex('team')
    .where('description', name)
    .first('id')
    .then(function (team) {
      return team.id
    })
}
