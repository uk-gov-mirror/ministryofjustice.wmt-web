const expect = require('chai').expect

const insertUser = require('../../../../app/services/data/insert-user')
const getUserByUsername = require('../../../..//app/services/data/get-user-by-username')
const userRoleHelper = require('../../../helpers/data/user-role-helper')

var insertedData = {
  table: 'users',
  id: 0
}

var username

describe('/services/data/insert-user', function () {
  before(function () {
    username = 'testusername'
  })

  it('should return an id when a valid user has been added', function () {
    return insertUser(username)
      .then(function (id) {
        insertedData.id = id
        return getUserByUsername(username)
          .then(function (result) {
            expect(id).to.be.a('number')
            expect(result.id).to.be.equal(id)
            expect(result.username).to.be.equal(username)
          })
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData([insertedData])
  })
})
