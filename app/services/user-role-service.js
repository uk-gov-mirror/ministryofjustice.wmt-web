const addUser = require('./data/insert-user')
const addUserRole = require('./data/insert-user-role')
const getUserByUsername = require('./data/get-user-by-username')
const getRole = require('./data/get-role')
const getRoleByUsername = require('./data/get-user-role-by-username')
const updateUserRole = require('./data/update-user-role')
const removeUserRoleByUserId = require('./data/remove-user-role-by-user-id')
const removeUserByUsername = require('./data/remove-user-by-username')

module.exports.getRoleByUsername = function (username) {
  username = removeDomainFromUsername(username)
  return getRoleByUsername(username).then(function (result) {
    return result[0]
  })
}

module.exports.updateUserRole = function (userId, roleId, updatedBy) {
  return updateUserRole(userId, roleId, updatedBy).then(function (result) {
    return result[0]
  })
}

module.exports.addUserRole = function (userRole) {
  return addUserRole(userRole).then(function (result) {
    return result[0]
  })
}

module.exports.getRole = function (role) {
  return getRole(role).then(function (result) {
    return result[0]
  })
}

module.exports.getUser = function (username) {
  username = removeDomainFromUsername(username)
  console.log(username)
  return getUserByUsername(username).then(function (result) {
    return result[0]
  })
}

module.exports.addUser = function (username) {
  username = removeDomainFromUsername(username)
  return addUser(username).then(function (result) {
    return result[0]
  })
}

module.exports.removeUserRoleByUserId = function (userId) {
  return removeUserRoleByUserId(userId)
}

module.exports.removeUserByUsername = function (username) {
  username = removeDomainFromUsername(username)
  return removeUserByUsername(username)
}

var removeDomainFromUsername = function (username) {
  var index = username.lastIndexOf('@')
  if (index >= 0) {
    return username.substring(0, index)
  }
  return username
}
