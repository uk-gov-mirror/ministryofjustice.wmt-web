const knex = require('../../../knex').web

module.exports = function (roleName) {
  if (roleName === undefined) {
    throw new ReferenceError('Role is not defined')
  }

  return knex('roles')
    .where('role', roleName)
    .select('id',
      'role')
    .then(function (role) {
      return role[0]
    })
}
