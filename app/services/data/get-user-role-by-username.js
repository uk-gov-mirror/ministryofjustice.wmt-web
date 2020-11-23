const knex = require('../../../knex').web
const Roles = require('../../constants/user-roles')

module.exports = function (username) {
  if (username === undefined) {
    throw new ReferenceError('username is not defined')
  }

  return knex('user_role')
    .join('roles', 'roles.id', 'user_role.role_id')
    .join('users', 'users.id', 'user_role.user_id')
    .where('users.username', username)
    .select('roles.id AS roleId', 'roles.role', 'users.name AS fullname')
    .then(function (result) {
      let role = result[0]
      if (!role) {
        role = { roleId: 0, role: Roles.STAFF }
      }
      return role
    })
}
