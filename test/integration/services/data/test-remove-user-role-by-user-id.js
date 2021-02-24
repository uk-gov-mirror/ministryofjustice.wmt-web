const expect = require('chai').expect

const removeUserRoleByUserId = require('../../../../app/services/data/remove-user-role-by-user-id')
const getUserRoleByUsername = require('../../../../app/services/data/get-user-role-by-username')
const userRoleHelper = require('../../../helpers/data/user-role-helper')

let insertedData = []

let userId = 1
let roleId = 1
let username

describe('/services/data/remove-user-role-by-user-id', function () {
  before(function () {
    return userRoleHelper.addUsers()
      .then(function (addedUser) {
        insertedData = addedUser
        userId = addedUser[0].id
        username = addedUser[0].username
        return userRoleHelper.addRoles()
          .then(function (addedRole) {
            roleId = addedRole[0].id
            insertedData = addedRole.concat(insertedData)
            return userRoleHelper.addUserRoleData(userId, roleId)
              .then(function (addedUserRole) {
                insertedData = insertedData.concat(addedUserRole)
              })
          })
      })
  })

  it('should remove user role by user id', function () {
    return removeUserRoleByUserId(userId)
      .then(function (count) {
        expect(count).to.be.greaterThan(0)
        return getUserRoleByUsername(username)
          .then(function (results) {
          // The default role, Staff, role should be returned.
            expect(results.roleId).to.be.a('number')
            expect(results.roleId).to.equal(0)
            expect(results.role).to.equal('Staff')
          })
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData(insertedData)
  })
})
