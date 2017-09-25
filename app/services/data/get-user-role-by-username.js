const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (username) {
  if (username === undefined) {
    throw new ReferenceError('username is not defined')
  }

  return knex('user_role')
    .join('roles', 'roles.id', 'user_role.role_id')
    .join('users', 'users.id', 'user_role.user_id')
    .where('users.username', username)
    .select('roles.id AS roleId',
            'roles.role')
    .then(function (result) {
      var role = result
      if (role.length === 0) {
        role.push({roleId: 0, role: 'Staff'})
      }
      return role
    })
}
