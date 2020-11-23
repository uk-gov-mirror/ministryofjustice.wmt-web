const expect = require('chai').expect

const insertUserRole = require('../../../../app/services/data/insert-user-role')
const updateUserRole = require('../../../../app/services/data/update-user-role')
const userRoleHelper = require('../../../helpers/data/user-role-helper')
const UserRole = require('../../../../app/services/domain/user-role')
const getUserRoleByUsername = require('../../../../app/services/data/get-user-role-by-username')

let insertedData = []
const userRole = new UserRole(1, 2, new Date(), 1)
let newRole = 1
let username

describe('/services/data/update-user-role', function () {
  before(function () {
    return userRoleHelper.addUsers()
      .then(function (addedUser) {
        insertedData = addedUser
        userRole.userId = addedUser[0].id
        userRole.lastUpdatedBy = addedUser[0].id
        username = addedUser[0].username
        return userRoleHelper.addRoles()
          .then(function (addedRole) {
            insertedData = insertedData.concat(addedRole)
            userRole.roleId = addedRole[0].id
            newRole = addedRole[1].id
            return insertUserRole(userRole)
              .then(function (id) {
                insertedData = insertedData.concat([{ table: 'user_role', id: id }])
              })
          })
      })
  })

  it('should return an id when a valid user role has been added', function () {
    return updateUserRole(userRole.userId, newRole, userRole.userId)
      .then(function (result) {
        expect(result).to.be.a('number')
        return getUserRoleByUsername(username)
          .then(function (results) {
            expect(results.roleId).to.be.a('number')
            expect(results.roleId).to.equal(newRole)
          })
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData(insertedData)
  })
})
