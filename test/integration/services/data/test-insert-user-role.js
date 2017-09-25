const expect = require('chai').expect

const insertUserRole = require('../../../../app/services/data/insert-user-role')
const userRoleHelper = require('../../../helpers/data/user-role-helper')
const UserRole = require('../../../../app/services/domain/user-role')

var insertedData = []
var newUserRole = new UserRole(1, 2, new Date(), 1)

describe('/services/data/insert-user-role', function () {
  before(function () {
    return userRoleHelper.addUsers()
      .then(function (ids) {
        insertedData = ids
        newUserRole.userId = ids[0].id
        newUserRole.lastUpdatedBy = ids[0].id
        return userRoleHelper.addRoles()
          .then(function (ids) {
            insertedData = insertedData.concat(ids)
            newUserRole.roleId = ids[0].id
          })
      })
  })

  it('should return an id when a valid user role has been added', function () {
    return insertUserRole(newUserRole)
      .then(function (result) {
        insertedData = insertedData.concat({table: 'user_role', id: result[0]})
        expect(result[0]).to.be.a('number')
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData(insertedData)
  })
})
