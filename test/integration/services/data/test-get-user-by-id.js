const expect = require('chai').expect

const getUserById = require('../../../../app/services/data/get-user-by-id')
const userRoleHelper = require('../../../helpers/data/user-role-helper')

var insertedData = []
var username
var userId
var name

describe('/services/data/get-user-by-id', function () {
  before(function () {
    return userRoleHelper.addUsers()
      .then(function (users) {
        insertedData = users
        username = users[0].username
        userId = users[0].id
        name = users[0].name
      })
  })

  it('should get user by the id', function () {
    return getUserById(userId)
      .then(function (result) {
        expect(result.username).to.be.a('string')
        expect(result.username).to.be.equal(username)
        expect(result.name).to.be.a('string')
        expect(result.name).to.be.equal(name)
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData(insertedData)
  })
})
