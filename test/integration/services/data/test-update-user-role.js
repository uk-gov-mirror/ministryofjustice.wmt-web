const expect = require('chai').expect

const insertUserRole = require('../../../../app/services/data/insert-user-role')
const updateUserRole = require('../../../../app/services/data/update-user-role')
const userRoleHelper = require('../../../helpers/data/user-role-helper')
const UserRole = require('../../../../app/services/domain/user-role')

var insertedData = []
var userRole = new UserRole(1, 2, new Date(), 1)
var newRole = 1

describe('/services/data/insert-user-role', function () {
  before(function () {
    return userRoleHelper.addUsers()
      .then(function (ids) {
        insertedData = ids
        userRole.userId = ids[0].id
        userRole.lastUpdatedBy = ids[0].id
        return userRoleHelper.addRoles()
          .then(function (ids) {
            insertedData = insertedData.concat(ids)
            userRole.roleId = ids[0].id
            newRole = ids[1].id
            return insertUserRole(userRole)
            .then(function (ids) {
              insertedData = insertedData.concat([{table: 'user_role', id: ids[0]}])
            })
          })
      })
  })

  it('should return an id when a valid user role has been added', function () {
    return updateUserRole(userRole.userId, newRole)
      .then(function (result) {
        expect(result[0]).to.be.a('number')
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData(insertedData)
  })
})
