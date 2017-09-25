const expect = require('chai').expect

const removeUserByUsername = require('../../../../app/services/data/remove-user-by-username')
const userRoleHelper = require('../../../helpers/data/user-role-helper')

var username
var insertedData = []

describe('/services/data/remove-user-by-username', function () {
  before(function () {
    return userRoleHelper.addUsers()
      .then(function (ids) {
        username = ids[0].username
        insertedData = ids
      })
  })

  it('should remove user role by username', function () {
    return removeUserByUsername(username)
      .then(function (result) {
        expect(result).to.be.greaterThan(0)
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData(insertedData)
  })
})
