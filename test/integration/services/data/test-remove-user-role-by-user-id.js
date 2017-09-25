const expect = require('chai').expect

const removeUserRoleByUserId = require('../../../../app/services/data/remove-user-role-by-user-id')
const userRoleHelper = require('../../../helpers/data/user-role-helper')

var username
var insertedData = []

var userId = 1
var roleId = 1

describe('/services/data/remove-user-role-by-user-id', function () {
  before(function () {
    return userRoleHelper.addUsers()
      .then(function (ids) {
        userId = ids[0].id
        insertedData = ids
        return userRoleHelper.addRoles()
          .then(function (ids) {
            roleId = ids[0].id
            insertedData = ids.concat(insertedData)
            return userRoleHelper.addUserRoleData(userId, roleId)
              .then(function (ids) {
                insertedData = insertedData.concat(ids)
                return userRoleHelper.getAnyExistingUsernameWithExistingRole()
                  .then(function (id) {
                    username = id.username
                  })
              })
          })
      })
  })

  it('should remove user role by username', function () {
    return removeUserRoleByUserId(username)
      .then(function (result) {
        expect(result[0]).to.be.greaterThan(0)
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData(insertedData)
  })
})
