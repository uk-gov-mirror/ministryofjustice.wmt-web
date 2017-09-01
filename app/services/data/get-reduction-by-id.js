const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (id) {
  var whereObject = {}
  if (id !== undefined) {
    whereObject.id = id
  }

  return knex('reductions')
    .where(whereObject)
    .then(function (reduction) {
      return reduction[0]
    })
}
