const expect = require('chai').expect

const getUserByUsername = require('../../../../app/services/data/get-user-by-username')
const userRoleHelper = require('../../../helpers/data/user-role-helper')

let insertedData = []
let username
let userId
let name

describe('/services/data/get-user-by-username', function () {
  before(function () {
    return userRoleHelper.addUsers()
      .then(function (users) {
        insertedData = users
        username = users[0].username
        userId = users[0].id
        name = users[0].name
      })
  })

  it('should get user by the username', function () {
    return getUserByUsername(username)
      .then(function (result) {
        expect(result.id).to.be.a('number')
        expect(result.id).to.be.equal(userId)
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
