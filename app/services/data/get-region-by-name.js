const knex = require('../../../knex').web

module.exports = function (name) {
  if (name === undefined) {
    throw new ReferenceError('Region Name is not defined')
  }

  return knex('region')
    .where('description', name)
    .first('id')
    .then(function (region) {
      return region.id
    })
}
