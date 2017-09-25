const expect = require('chai').expect

const getUserByUsername = require('../../../../app/services/data/get-user-by-username')
const userRoleHelper = require('../../../helpers/data/user-role-helper')

var insertedData = []
var username

describe('/services/data/get-user-by-username', function () {
  before(function () {
    return userRoleHelper.addUsers()
       .then(function (ids) {
         insertedData = ids
         username = ids[0].username
       })
  })

  it('should get user by the id', function () {
    return getUserByUsername(username)
      .then(function (result) {
        expect(result[0].id).to.be.a('number')
        expect(result[0].username).to.be.a('string')
        expect(result[0].username).to.be.equal(username)
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData(insertedData)
  })
})
