const expect = require('chai').expect

const removeUserByUsername = require('../../../../app/services/data/remove-user-by-username')
const userRoleHelper = require('../../../helpers/data/user-role-helper')
const getUserByUsername = require('../../../..//app/services/data/get-user-by-username')

let username
let insertedData = []

describe('/services/data/remove-user-by-username', function () {
  before(function () {
    return userRoleHelper.addUsers()
      .then(function (addedUser) {
        username = addedUser[0].username
        insertedData = addedUser
      })
  })

  it('should remove user role by username', function () {
    return removeUserByUsername(username)
      .then(function (result) {
        expect(result).to.be.greaterThan(0)
        return getUserByUsername(username)
          .then(function (result) {
            expect(result).to.not.exist //eslint-disable-line
          })
      })
  })

  after(function () {
    return userRoleHelper.removeInsertedData(insertedData)
  })
})
