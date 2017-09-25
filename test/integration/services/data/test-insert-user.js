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
      .then(function (ids) {
        insertedData.id = ids[0]
        return getUserByUsername(username)
          .then(function (result) {
            expect(ids[0]).to.be.a('number')
            expect(result[0].id).to.be.equal(ids[0])
          })
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData([insertedData])
  })
})
