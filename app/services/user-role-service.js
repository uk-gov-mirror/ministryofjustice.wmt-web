const removeUserRoleByUserId = require('./data/remove-user-role-by-user-id')
const removeUserByUsername = require('./data/remove-user-by-username')
const getRoleByUsername = require('./data/get-user-role-by-username')
const getUserByUsername = require('./data/get-user-by-username')
const updateUserRole = require('./data/update-user-role')
const addUserRole = require('./data/insert-user-role')
const getUserById = require('./data/get-user-by-id')
const addUser = require('./data/insert-user')
const getRole = require('./data/get-role')

module.exports.getRoleByUsername = function (username) {
  return getRoleByUsername(username).then(function (result) {
    return result
  })
}

module.exports.updateUserRole = function (userId, roleId, updatedBy) {
  return updateUserRole(userId, roleId, updatedBy).then(function (result) {
    return result
  })
}

module.exports.addUserRole = function (userRole) {
  return addUserRole(userRole).then(function (result) {
    return result
  })
}

module.exports.getRole = function (role) {
  return getRole(role).then(function (result) {
    return result
  })
}

module.exports.getUserByUsername = function (username) {
  return getUserByUsername(username).then(function (result) {
    return result
  })
}

module.exports.getUserById = function (userId) {
  return getUserById(userId).then(function (result) {
    return result
  })
}

module.exports.addUser = function (username, name) {
  return addUser(username, name).then(function (result) {
    return result
  })
}

module.exports.removeUserRoleByUserId = function (userId) {
  return removeUserRoleByUserId(userId)
}

module.exports.removeUserByUsername = function (username) {
  return removeUserByUsername(username)
}

module.exports.removeDomainFromUsername = function (username) {
  if (username !== undefined) {
    var index = username.lastIndexOf('@')
    if (index >= 0) {
      return username.substring(0, index)
    }
  }
  return username
}
