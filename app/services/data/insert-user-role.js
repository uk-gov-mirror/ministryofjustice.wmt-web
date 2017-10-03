const config = require('../../../knexfile').web
const knex = require('knex')(config)

module.exports = function (newUserRole) {
  return knex('user_role')
    .insert({
      user_id: newUserRole.userId,
      role_id: newUserRole.roleId,
      last_updated: newUserRole.lastUpdated,
      last_updated_by: newUserRole.lastUpdatedBy
    })
    .returning('id').then(function (ids) {
      return ids[0]
    })
}
