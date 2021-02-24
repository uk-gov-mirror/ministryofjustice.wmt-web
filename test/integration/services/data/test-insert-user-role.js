const expect = require('chai').expect

const insertUserRole = require('../../../../app/services/data/insert-user-role')
const userRoleHelper = require('../../../helpers/data/user-role-helper')
const UserRole = require('../../../../app/services/domain/user-role')
const getUserRoleByUsername = require('../../../..//app/services/data/get-user-role-by-username')

let insertedData = []
const newUserRole = new UserRole(1, 2, new Date(), 1)
let username

describe('/services/data/insert-user-role', function () {
  before(function () {
    return userRoleHelper.addUsers()
      .then(function (addedUser) {
        insertedData = addedUser
        newUserRole.userId = addedUser[0].id
        newUserRole.lastUpdatedBy = addedUser[0].id
        username = addedUser[0].username
        return userRoleHelper.addRoles()
          .then(function (addedRole) {
            insertedData = insertedData.concat(addedRole)
            newUserRole.roleId = addedRole[0].id
          })
      })
  })

  it('should return an id when a valid user role has been added', function () {
    return insertUserRole(newUserRole)
      .then(function (result) {
        insertedData = insertedData.concat({ table: 'user_role', id: result })
        expect(result).to.be.a('number')
        return getUserRoleByUsername(username)
          .then(function (results) {
            expect(results.roleId).to.be.a('number')
            expect(results.roleId).to.be.equal(newUserRole.roleId)
          })
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData(insertedData)
  })
})
