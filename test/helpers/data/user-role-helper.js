const config = require('../../../knexfile').integrationTests
const knex = require('knex')(config)
var Promise = require('bluebird').Promise

module.exports.addUserRoleData = function (userId, roleId) {
  var insertedData = []

  var userRole = {
    user_id: userId,
    role_id: roleId,
    last_updated: new Date(),
    last_updated_by: userId
  }

  return knex('user_role').returning('id').insert(userRole)
    .then(function (ids) {
      ids.forEach((id) => {
        insertedData.push({ table: 'user_role', id: id })
      })
      return insertedData
    })
}

module.exports.addUsers = function () {
  var inserts = []

  var users = [
    { username: 'testusername', name: 'Test User' }
  ]

  return knex('users').returning(['id', 'username', 'name']).insert(users)
    .then(function (result) {
      result.forEach((user) => {
        inserts.push({ table: 'users', id: user.id, username: user.username, name: user.name })
      })
      return inserts
    })
}

module.exports.addRoles = function () {
  var inserts = []

  var roles = [
    { role: 'Test_Role1' },
    { role: 'Test_Role2' }
  ]

  return knex('roles').returning('id').insert(roles)
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'roles', id: id })
      })
      return inserts
    })
}

module.exports.getAnyExistingUsernameWithExistingRole = function () {
  return knex('users')
  .join('user_role', 'user_role.user_id', 'users.id')
  .first('users.username')
}

module.exports.removeInsertedData = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, (insert) => {
    return knex(insert.table).where('id', insert.id).del()
  })
}
