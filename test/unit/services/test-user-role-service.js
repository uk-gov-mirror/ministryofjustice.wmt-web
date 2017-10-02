const expect = require('chai').expect
const sinon = require('sinon')
require('sinon-bluebird')

const proxyquire = require('proxyquire')
const config = require('../../../config')
const userRole = require('../../../app/constants/user-roles.js')
const UserRole = require('../../../app/services/domain/user-role')

var STAFF_USER = 'Staff.Test@' + config.ACTIVE_DIRECTORY_DOMAIN

var STAFF_ROLE = { roleId: 0, role: userRole.STAFF }

var userRoleService
var getRoleByUsername
var updateUserRole
var addUserRole
var getRole
var getUser
var addUser
var removeUserRoleByUserId
var removeUserByUsername

beforeEach(function () {
  getRoleByUsername = sinon.stub().returns({ roleId: 0, role: 'Staff' })
  updateUserRole = sinon.stub()
  addUserRole = sinon.stub()
  getRole = sinon.stub()
  getUser = sinon.stub()
  addUser = sinon.stub()
  removeUserRoleByUserId = sinon.stub()
  removeUserByUsername = sinon.stub()

  userRoleService =
    proxyquire('../../../app/services/user-role-service',
      {
        './data/remove-user-role-by-user-id': removeUserRoleByUserId,
        './data/remove-user-by-username': removeUserByUsername,
        './data/get-user-role-by-username': getRoleByUsername,
        './data/get-user-by-username': getUser,
        './data/update-user-role': updateUserRole,
        './data/insert-user-role': addUserRole,
        './data/insert-user': addUser,
        './data/get-role': getRole
      })
})

describe('services/user-role-service', function () {
  it('should return a user role object with the right information', function () {
    getRoleByUsername.resolves(STAFF_ROLE)
    return userRoleService.getRoleByUsername(STAFF_USER)
      .then(function (result) {
        expect(result.roleId).to.equal(0)
        expect(result.role).to.equal(userRole.STAFF)
      })
  })

  it('should return a role object with the right information', function () {
    getRole.resolves(STAFF_ROLE)
    return userRoleService.getRole(userRole.STAFF)
      .then(function (result) {
        expect(result.roleId).to.be.a('number')
        expect(result.role).to.equal(userRole.STAFF)
      })
  })

  it('should return a user object with the right information', function () {
    getUser.resolves({id: 1, username: STAFF_USER})
    return userRoleService.getUser(STAFF_USER)
      .then(function (result) {
        expect(result.id).to.be.a('number')
        expect(result.username).to.equal(STAFF_USER)
      })
  })

  it('should add a user', function () {
    addUser.resolves(1)
    return userRoleService.addUser(STAFF_USER)
      .then(function (result) {
        expect(result).to.equal(1)
      })
  })

  updateUserRole = sinon.stub()
  addUserRole = sinon.stub()

  it('should add a user role', function () {
    addUserRole.resolves(1)
    return userRoleService.addUserRole(new UserRole(1, 1, new Date(), 1))
      .then(function (result) {
        expect(result).to.equal(1)
      })
  })

  it('should update a user role', function () {
    updateUserRole.resolves(1)
    return userRoleService.updateUserRole(new UserRole(1, 2, new Date(), 1))
      .then(function (result) {
        expect(result).to.equal(1)
      })
  })

  it('should remove a user role by user id', function () {
    removeUserRoleByUserId.resolves(1)
    return userRoleService.removeUserRoleByUserId(1)
      .then(function (result) {
        expect(result).to.equal(1)
      })
  })

  it('should remove a user by username', function () {
    removeUserByUsername.resolves(1)
    return userRoleService.removeUserByUsername(STAFF_USER)
      .then(function (result) {
        expect(result).to.equal(1)
      })
  })
})
