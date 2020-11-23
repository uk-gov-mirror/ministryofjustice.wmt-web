const expect = require('chai').expect

const getUserRoleByUsername = require('../../../../app/services/data/get-user-role-by-username')
const userRoleHelper = require('../../../helpers/data/user-role-helper')

let username
const existingRoles = ['Test_Role1', 'Test_Role2']

let insertedData = []

let userId = 1
let roleId = 1

describe('/services/data/get-user-role-by-username', function () {
  before(function () {
    return userRoleHelper.addUsers()
      .then(function (ids) {
        userId = ids[0].id
        username = ids[0].username
        insertedData = ids
        return userRoleHelper.addRoles()
          .then(function (ids) {
            roleId = ids[0].id
            insertedData = ids.concat(insertedData)
            return userRoleHelper.addUserRoleData(userId, roleId)
              .then(function (ids) {
                insertedData = insertedData.concat(ids)
              })
          })
      })
  })

  it('should get user role by username', function () {
    return getUserRoleByUsername(username)
      .then(function (result) {
        expect(result.role).to.be.oneOf(existingRoles)
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData(insertedData)
  })
})
